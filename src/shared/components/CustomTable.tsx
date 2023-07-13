import React, { useEffect, useState } from "react";
import styles from "./CustomTable.module.css";

/**
 * Represents the column configuration for the table.
 */
interface TableColumn {
  columnName: string; // Display name of the column
  relevantPropertyName: string; // Corresponding property name in the data
  isSortable?: boolean; // Indicates if the column is sortable
  isSearchable?: boolean; // Indicates if the column is searchable
}

/**
 * Represents the data for the table.
 */
interface TableData {
  tableColumns: TableColumn[]; // Configuration for table columns
  tableBody: { id: string; [key: string]: any }[]; // Data for table body rows
  tablePaginationLengthPerPage?: number; // Number of rows per page in pagination
  isHebrewTable?: boolean; // Indicates if the table is in Hebrew language
}

/**
 * Represents the props for the CustomTable component.
 */
interface TableProps {
  data: TableData; // Data for rendering the table
}

/**
 * Represents a custom table component.
 */
const CustomTable: React.FC<TableProps> = ({ data }) => {
  const {
    tableColumns,
    tableBody,
    tablePaginationLengthPerPage,
    isHebrewTable,
  } = data;

  // Sorting states
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC"); // Sort direction: ASC or DESC
  const [sortIndex, setSortIndex] = useState<number | null>(null); // Index of the sorted column
  const [sortedColumn, setSortedColumn] = useState<string | null>(null); // Name of the sorted column

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Data states
  const [rowsData, setRowsData] = useState([...tableBody]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = tablePaginationLengthPerPage || 10;

  // Calculate current page's row indexes
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rowsData.slice(indexOfFirstRow, indexOfLastRow);

  // filtered array of searchable columns
  const filteredSearchableColumns = tableColumns.filter(
    (tc) => tc.isSearchable
  );

  // Make string for inputs placeholder
  const placeholder = filteredSearchableColumns
    .map((tableColumn, index) => {
      if (filteredSearchableColumns.length === 1) {
        return ` ${tableColumn.columnName}`;
      } else if (filteredSearchableColumns.length === index + 1) {
        return ` and ${tableColumn.columnName}...`;
      } else {
        return ` ${tableColumn.columnName}`;
      }
    })
    .join();

  // Calculate the width for each column dynamically
  const columnWidth = `${100 / tableColumns.length}%`;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Sorting function
  const sorting = (columnName: string, columnIndex: number) => {
    if (sortedColumn === columnName) {
      // Reverse the sorting direction if the same column is clicked again
      setSort(sort === "ASC" ? "DESC" : "ASC");
    } else {
      // Sort in ascending order by default when a new column is clicked
      setSort("ASC");
      setSortedColumn(columnName);
    }
    const sorted = [...rowsData].sort((a, b) =>
      sort === "ASC"
        ? a[columnName] > b[columnName]
          ? 1
          : -1
        : a[columnName] > b[columnName]
        ? -1
        : 1
    );
    setRowsData(sorted);
    setSortIndex(columnIndex);
  };

  // Handle search term change
  useEffect(() => {
    if (searchTerm === "") {
      setRowsData([...tableBody]);
    } else {
      const filteredData = tableBody.filter((rowData) => {
        const values = filteredSearchableColumns.map(
          (column) => rowData[column.relevantPropertyName]
        );
        for (const value of values) {
          if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        }
        return false;
      });

      setRowsData([...filteredData]);
    }
  }, [searchTerm]);

  return (
    <div className={styles.container} dir={isHebrewTable ? "rtl" : "ltr"}>
      {/* Search input */}
      <input
        defaultValue={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        type="text"
        className={isHebrewTable ? styles.rightInput : styles.leftInput}
        placeholder={`${
          isHebrewTable ? "חפש לפי" : "Search by"
        } :${placeholder}`}
      />
      {/* Table or Cards */}
      <div className={styles.tableContainer}>
        <div className={styles.cardContainer}>
          {/* Render cards for each rowData object */}

          {currentRows.length !== 0 ? (
            <div className={styles.sortContainer}>
              <span>{isHebrewTable ? "מיין לפי" : "Sort By"} : </span>
              {tableColumns.map((tableColumn, index) => {
                if (tableColumn.isSortable) {
                  return (
                    <button
                      className={styles.sortButton}
                      key={tableColumn.columnName}
                      onClick={() => {
                        sorting(tableColumn.relevantPropertyName, index + 1);
                      }}
                    >
                      {tableColumn.columnName}
                      {sortIndex === index + 1 && sort === "ASC" && (
                        <span className={styles.sortIndicator}>⬆️</span>
                      )}
                      {sortIndex === index + 1 && sort === "DESC" && (
                        <span className={styles.sortIndicator}>⬇️</span>
                      )}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          ) : null}

          {currentRows.map((rowData, rowIndex) => (
            <Card key={rowIndex} rowData={rowData} />
          ))}
        </div>
        <table className={styles.table}>
          <thead>
            {currentRows.length !== 0 ? (
              <>
                <tr>
                  {/* Table headers */}
                  {tableColumns.map((column, columnIndex) => (
                    <th
                      onClick={() => {
                        if (column.isSortable) {
                          sorting(column.relevantPropertyName, columnIndex + 1);
                        }
                      }}
                      key={column.columnName}
                      className={styles.tableHeader}
                    >
                      <div className={styles.tableHeaderContent}>
                        {/* Column name */}
                        {column.columnName}
                        {/* Sort indicator */}
                        {sortIndex === columnIndex + 1 && sort === "ASC" && (
                          <span className={styles.sortIndicator}>⬆️</span>
                        )}
                        {sortIndex === columnIndex + 1 && sort === "DESC" && (
                          <span className={styles.sortIndicator}>⬇️</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </>
            ) : null}
          </thead>
          <tbody>
            {/* Table body */}
            {currentRows.map((rowData, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className={
                    rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
                  }
                >
                  {Object.values(rowData).map((cellData, cellIndex) => {
                    if (cellIndex !== 0) {
                      // Render cells based on value types
                      return (
                        <td
                          key={cellIndex}
                          style={{ width: columnWidth }}
                          className={
                            isHebrewTable
                              ? styles.rightTableCell
                              : styles.leftTableCell
                          }
                        >
                          {typeof cellData === "boolean" ? (
                            cellData ? (
                              <span className={styles.checkmark}>✅</span>
                            ) : (
                              <span className={styles.crossmark}>❎</span>
                            )
                          ) : typeof cellData === "number" ? (
                            cellData.toFixed(2)
                          ) : (
                            cellData
                          )}
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {currentRows.length === 0 ? (
          <div className={styles.notFoundMessage}>
            {isHebrewTable ? "לא נמצאו תוצאות" : "No results found"}
          </div>
        ) : null}
      </div>
      {/* Pagination */}
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRows={rowsData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

/**
 * Represents a card component for mobile view.
 */
interface CardProps {
  rowData: { id: string; [key: string]: any }; // Data for rendering the card
}

const Card: React.FC<CardProps> = ({ rowData }) => {
  // Render card based on rowData object
  return (
    <div className={styles.card}>
      {Object.entries(rowData).map(([key, value], index) => {
        if (index !== 0) {
          return (
            <div key={key} className={styles.cardRow}>
              <div className={styles.cardLabel}>{key}:</div>
              <div className={styles.cardValue}>
                {typeof value === "boolean" ? (
                  value ? (
                    <span className={styles.checkmark}>✅</span>
                  ) : (
                    <span className={styles.crossmark}>❎</span>
                  )
                ) : typeof value === "number" ? (
                  value.toFixed(2)
                ) : (
                  value
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

/**
 * Represents the props for the Pagination component.
 */
interface PaginationProps {
  currentPage: number; // Current active page
  rowsPerPage: number; // Number of rows per page
  totalRows: number; // Total number of rows
  onPageChange: (page: number) => void; // Callback for page change
}

/**
 * Represents a pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  rowsPerPage,
  totalRows,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            currentPage === i ? styles.activeButton : ""
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  // Conditionally render the pagination container
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationButtonsContainer}>
      {renderPaginationButtons()}
    </div>
  );
};

export default CustomTable;

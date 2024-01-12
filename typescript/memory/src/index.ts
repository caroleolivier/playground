function readByRows(matrix: number[][], rows: number, columns: number) {
  const start = performance.now();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const _ = matrix[row][col];
    }
  }

  const end = performance.now();
  console.log(`⏱  Reading by rows: ${Math.round(end - start)} ms`);
}

function readByColumns(matrix: number[][], rows: number, columns: number) {
  const start = performance.now();

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      const _ = matrix[row][col];
    }
  }

  const end = performance.now();
  console.log(`⏱  Reading by columns: ${Math.round(end - start)} ms`);
}

function readUsingForOf(matrix: number[][], rows: number, columns: number) {
  const start = performance.now();

  for (const row of matrix) {
    for (let col = 0; col < columns; col++) {
      const _ = row[col];
    }
  }

  const end = performance.now();
  console.log(`⏱  Reading by rows for-of: ${Math.round(end - start)} ms`);
}

function main() {
  console.log("🏗  Building and filling matrix...");
  const ROWS = 50000;
  const COLUMNS = 50000;
  const matrix: number[][] = new Array(ROWS).fill(
    new Int8Array(COLUMNS).fill(1)
  );

  console.log(`ℹ️  Number of rows: ${ROWS} and columns: ${COLUMNS}`);

  readByColumns(matrix, ROWS, COLUMNS);
  readByColumns(matrix, ROWS, COLUMNS);
  readByColumns(matrix, ROWS, COLUMNS);
  readByColumns(matrix, ROWS, COLUMNS);
  readByColumns(matrix, ROWS, COLUMNS);

  readByRows(matrix, ROWS, COLUMNS);
  readByRows(matrix, ROWS, COLUMNS);
  readByRows(matrix, ROWS, COLUMNS);
  readByRows(matrix, ROWS, COLUMNS);
  readByRows(matrix, ROWS, COLUMNS);
}

main();

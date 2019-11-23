export const generateBoard = ({ height, width }) => {
  let newBoard = []
  for (let w = 0; w < width; w++) {
    const row = []
    for (let h = 0; h < height; h++) {
      row.push(0)
    }
    newBoard.push(row)
  }
  return () => {
    return newBoard
  }
}
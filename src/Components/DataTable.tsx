import styled from "styled-components";

interface IProps {
  selectedFieldLabels: Record<string, string>;
  selectedData: IProduct[] | IGameCharacter[] | ICustomerOrder[];
}

export default function DataTable({
  selectedFieldLabels,
  selectedData,
}: IProps) {
  const labels = Object.keys(selectedFieldLabels);
  const columnNums = labels.length;
  const rowNums = selectedData.length + 1;

  return (
    <Container rowNums={rowNums} columnNums={columnNums}>
      {labels.map((label) => (
        <Cell style={{ borderBottom: "1px solid black" }} key={label}>
          <span>
            {selectedFieldLabels[label as keyof typeof selectedFieldLabels]}
          </span>
        </Cell>
      ))}
      {selectedData.map((datum) => {
        return (
          <>
            {labels.map((label) => (
              <Cell key={label}>
                <span>{datum[label as keyof typeof datum]}</span>
              </Cell>
            ))}
          </>
        );
      })}
    </Container>
  );
}

const Container = styled.div<{ columnNums: number; rowNums: number }>`
  width: 100%;
  display: grid;
  grid-template-rows: ${({ rowNums }) => `repeat(${rowNums}, 1fr)`};
  grid-template-columns: ${({ columnNums }) => `repeat(${columnNums}, 1fr)`};
  margin-left: 30px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 30px;
`;

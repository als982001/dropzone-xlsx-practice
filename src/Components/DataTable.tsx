interface IProps {
  selectedFieldLabels: Record<string, string>;
  selectedData: IProduct[] | IGameCharacter[] | ICustomerOrder[];
}

export default function DataTable({
  selectedFieldLabels,
  selectedData,
}: IProps) {
  const lables = Object.keys(selectedFieldLabels);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {lables.map((label) => (
          <div key={label}>
            <span>
              {selectedFieldLabels[label as keyof typeof selectedFieldLabels]}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {selectedData.map((datum) => {
          return (
            <div key={datum.id}>
              {lables.map((label) => (
                <div key={label}>
                  <span>{datum[label as keyof typeof datum]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

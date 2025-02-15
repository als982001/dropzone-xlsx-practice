const tableKeys = {
  name: "이름",
  class: "직업",
  level: "레벨",
  health: "체력",
  mana: "마나",
  attackPower: "공격력",
  defense: "방어력",
  creationDate: "생성날짜",
};

interface IProps {
  gamecharacters: IGameCharacter[];
}

export default function GameCharactersTable({ gamecharacters }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {Object.keys(tableKeys).map((tableKey) => (
          <div key={tableKey}>
            <span>{tableKeys[tableKey as keyof typeof tableKeys]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {gamecharacters.map((character) => {
          return (
            <div key={character.characterId}>
              {Object.keys(tableKeys).map((tableKey) => (
                <div key={tableKey}>
                  <span>{character[tableKey as keyof typeof tableKeys]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

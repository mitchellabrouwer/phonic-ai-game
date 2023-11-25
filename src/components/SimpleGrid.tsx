function SimpleGrid() {
  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Create a 4-column grid
    gridGap: "10px", // Add some space between grid items
  };

  return (
    <div style={style}>
      <div
        style={{
          gridColumnEnd: "span 2",
          backgroundColor: "lightblue",
          backgroundImage: `url(/assets/background/terrain/Grass_Tile.png)`,
        }}
      >
        Item 1 (2 cols)
      </div>
      <div style={{ gridColumnEnd: "span 1", backgroundColor: "lightcoral" }}>
        Item 2 (1 col)
      </div>
      <div style={{ gridColumnEnd: "span 1", backgroundColor: "lightgreen" }}>
        Item 3 (1 col)
      </div>
      <div style={{ gridColumnEnd: "span 4", backgroundColor: "lightyellow" }}>
        Item 4 (full row)
      </div>
    </div>
  );
}

export default SimpleGrid;

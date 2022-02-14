import { useEffect, useState } from 'react';

const Statistics = ({ graph, selected }) => {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    initGraph();
  }, [selected, graph]);

  const initGraph = () => {
    let adj = [];
    for (let i = 0; i < Object.keys(graph).length; i++) {
      adj.push([]);
      for (let j = 0; j < Object.keys(graph).length; j++) {
        adj[i].push(0);
      }
    }
    for (const key of Object.keys(graph)) {
      const x = namedToNumber(key);
      for (const keyY of graph[key]) {
        const y = namedToNumber(keyY);
        adj[x - 1][y - 1] = 1;
        adj[y - 1][x - 1] = 1;
      }
    }
    setMatrix(adj);
  };
  const namedToNumber = (entry) => entry.slice(1);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 400,
        height: 400,
        backgroundColor: 'rgb(30,30,30)',
        color: 'white',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomRightRadius: 20,
      }}
    >
      {matrix.map((e) => (
        <div style={{ fontSize: 20 }}>{e}</div>
      ))}
    </div>
  );
};

export default Statistics;

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import Statistics from './components/Statistics';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [graph, setGraph] = useState({});
  const [selected, setSelected] = useState([]);
  const [lines, setLines] = useState([]);

  console.log(graph);
  return (
    <motion.div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("https://wallpaperaccess.com/full/2641074.gif")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        let elementAtxy = document.elementFromPoint(e.clientX, e.clientY);
        let classArray = Array(...elementAtxy.classList);
        if (classArray.includes('graphnode')) {
          if (selected.length === 1) {
            if (!graph[selected[0]].includes(classArray[1])) {
              let newGraph = graph;
              newGraph[classArray[1]].push(selected[0]);
              newGraph[selected[0]].push(classArray[1]);
              setGraph(newGraph);
              setLines([
                ...lines,
                <Line to={selected[0]} from={classArray[1]} />,
              ]);
            }
            setSelected([]);
          } else {
            setSelected([classArray[1]]);
          }
        } else if (selected.length === 1) {
          setSelected([]);
        }
      }}
      onClick={(e) => {
        console.log(e.currentTarget);
        setNodes([
          ...nodes,
          { title: nodes.length + 1, initialX: e.clientX, initialY: e.clientY },
        ]);
        setGraph({ ...graph, [`v${nodes.length + 1}`]: [] });
      }}
    >
      {nodes.map((item) => (
        <GraphNode
          title={item.title}
          initialX={item.initialX}
          initialY={item.initialY}
          selected={selected.some((i) => i === `v${item.title}`)}
        />
      ))}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {lines}
      </svg>
      <Statistics graph={graph} selected={selected} />
    </motion.div>
  );
};

export default App;

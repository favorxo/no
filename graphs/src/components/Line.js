import { useEffect, useRef } from 'react';

const Line = (props) => {
  const from = useRef();
  const to = useRef();
  const line = useRef();
  useEffect(() => {
    from.current = document.getElementsByClassName(props.from)[0];
    to.current = document.getElementsByClassName(props.to)[0];
    let { x: x0, y: y0 } = from.current.getBoundingClientRect();
    let { x: x1, y: y1 } = to.current.getBoundingClientRect();
    line.current.setAttribute('x1', x0 + 30);
    line.current.setAttribute('y1', y0 + 30);
    line.current.setAttribute('x2', x1 + 30);
    line.current.setAttribute('y2', y1 + 30);
    from.current.addEventListener('mousemove', (e) => {
      let { x, y } = from.current.getBoundingClientRect();
      line.current.setAttribute('x1', x + 30);
      line.current.setAttribute('y1', y + 30);
    });
    to.current.addEventListener('mousemove', (e) => {
      let { x, y } = to.current.getBoundingClientRect();
      line.current.setAttribute('x2', x + 30);
      line.current.setAttribute('y2', y + 30);
    });
  }, []);
  return <line ref={line} stroke="black" strokeWidth={5}></line>;
};

export default Line;

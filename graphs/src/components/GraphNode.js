import { motion } from 'framer-motion';
const GraphNode = (props) => {
  return (
    <motion.div
      className={`graphnode v${props.title}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        borderRadius: 60,
        position: 'absolute',
        display: 'flex',
        width: 60,
        height: 60,
        translateX: props.initialX - 30,
        translateY: props.initialY - 30,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        backgroundImage: 'url("/blushW.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 60,
        scale: props.selected ? -1 : 1,
        zIndex: 2,
      }}
      drag
      animate={{ scale: props.selected ? -1 : 1 }}
      whileTap={{ scale: props.selected ? -1.5 : 1.5 }}
      dragMomentum={false}
      initial={{ scale: 0.2 }}
    >
      {props.title}
    </motion.div>
  );
};

export default GraphNode;

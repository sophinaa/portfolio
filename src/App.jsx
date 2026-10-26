import { MotionConfig } from "framer-motion";

import Computer from "./components/os/Computer";

const App = () => (
  <MotionConfig reducedMotion='user'>
    <Computer />
  </MotionConfig>
);

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../../components/LoginForm';

function Login() {
  return (
    <motion.div
      className="login-page-container"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4 } }}
    >
      <LoginForm />
    </motion.div>
  );
}

export default Login;

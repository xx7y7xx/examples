// module.js

const foo = () => {
  return 'bar';
};

// Run the script only if it's executed directly (not when imported)
if (require.main === module) {
  console.log('Print the result of foo() in module.js:', foo());
}

module.exports = foo;

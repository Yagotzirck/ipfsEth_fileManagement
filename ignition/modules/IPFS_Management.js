const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const IPFS_Management_Module = buildModule("IPFS_Management_Module", (m) => {
  const token = m.contract("IPFS_Management");

  return { token };
});

module.exports = IPFS_Management_Module;

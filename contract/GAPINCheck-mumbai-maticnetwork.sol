pragma solidity 0.4.24;

import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.4/ChainlinkClient.sol";
import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.4/vendor/Ownable.sol";

contract GoogleAuthenticatorPINCheck is ChainlinkClient, Ownable {
  uint256 constant private ORACLE_PAYMENT = 10 ** 16;
  bytes32  constant private JOBID = "f82dfad608254bc7a36364f317e47a4d";
  address constant private ORACLE_ADDRESS = 0xA244B30a48559d16078BB151f342d3f12219142F;

  bool public currentPermission;

  event RequestGAPINCheckFulfilled(
    bytes32 indexed requestId,
    bool indexed allowed
  );

  constructor() public Ownable() {
    setChainlinkToken(0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB);
    currentPermission = false;
  }

  function requestGAPINCheck(string memory _customerId, int256 _hashedpin)
    public
  {
    Chainlink.Request memory req = buildChainlinkRequest(JOBID, address(this), this.fulfillGAPINCheck.selector);

    req.add("customerid", _customerId);
    req.addInt("hashedpin", _hashedpin);
    req.add("path","result");

    sendChainlinkRequestTo(ORACLE_ADDRESS, req, ORACLE_PAYMENT);
  }
  
  function fulfillGAPINCheck(bytes32 _requestId, bool _allowed)
    public
    recordChainlinkFulfillment(_requestId)
  {
    currentPermission = _allowed;
    emit RequestGAPINCheckFulfilled(_requestId, currentPermission);
    if (currentPermission) {
        //*********************************************************************
        // TO DO THE SPECIAL ACTION
        //*********************************************************************
        //currentPermission = false;
    }
  }
  
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

contract Game {
	address owner;

	mapping(address => mapping(string => bool)) public talents;
	// the talent points that you get when you level up
	// spend each one on a talent afterwards
	mapping(address => uint) public points;

	constructor() {
	    owner = msg.sender;
	}

	// TODO: grant the address 1 point they can spend
	function levelUp(address user) public {
		// add security only the owner can level up a user, otherwise REVERT
		require(msg.sender == owner);
		points[user]++;
	}

	// TODO: grant the address the corresponding talent
	function chooseTalent(string memory cid) public {
		// require that they have at least 1 talent point to spend, otherwise REVERT
		require(points[msg.sender] > 0);
		// set that talent point associated to the cid
		talents[msg.sender][cid] = true;
		// decrement the points for the msg.sender
		points[msg.sender]--;
	}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Election is Ownable {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    enum State { Created, Running, Ended }

    State public electionState;
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event CandidateAdded(uint indexed id, string name);
    event CandidateRemoved(uint indexed id);
    event ElectionStarted();
    event ElectionEnded();
    event Voted(uint indexed candidateId, address indexed voter);

    modifier inState(State _state) {
        require(electionState == _state, "Election is not in the correct state");
        _;
    }

    constructor() Ownable(msg.sender) {
        electionState = State.Created;
    }

    function addCandidate(string memory _name) public onlyOwner inState(State.Created) {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    function removeCandidate(uint _candidateId) public onlyOwner inState(State.Created) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        delete candidates[_candidateId];
        emit CandidateRemoved(_candidateId);
    }

    function startElection() public onlyOwner inState(State.Created) {
        electionState = State.Running;
        emit ElectionStarted();
    }

    function endElection() public onlyOwner inState(State.Running) {
        electionState = State.Ended;
        emit ElectionEnded();
    }

    function vote(uint _candidateId) public inState(State.Running) {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        require(bytes(candidates[_candidateId].name).length != 0, "Candidate does not exist");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit Voted(_candidateId, msg.sender);
    }
}
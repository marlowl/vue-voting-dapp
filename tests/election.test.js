const Election = artifacts.require("Election");
const truffleAssert = require('truffle-assertions');

contract("Election", (accounts) => {
    let election;
    const owner = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];

    beforeEach(async () => {
        election = await Election.new({ from: owner });
    });

    it("should deploy the contract and set the owner", async () => {
        const contractOwner = await election.owner();
        assert.equal(contractOwner, owner, "The owner is not set correctly");
    });

    context("Candidate Management", () => {
        it("should allow the owner to add a candidate", async () => {
            await election.addCandidate("Candidate 1", { from: owner });
            const candidate = await election.candidates(1);
            assert.equal(candidate.name, "Candidate 1", "Candidate was not added");
        });

        it("should not allow a non-owner to add a candidate", async () => {
            await truffleAssert.reverts(
                election.addCandidate("Candidate 2", { from: voter1 })
            );
        });
    });

    context("Election Lifecycle", () => {
        beforeEach(async () => {
            await election.addCandidate("Candidate 1", { from: owner });
        });

        it("should allow the owner to start the election", async () => {
            await election.startElection({ from: owner });
            const state = await election.electionState();
            assert.equal(state.toString(), "1", "Election state should be Running");
        });

        it("should not allow a non-owner to start the election", async () => {
            await truffleAssert.reverts(
                election.startElection({ from: voter1 })
            );
        });

        it("should allow the owner to end the election", async () => {
            await election.startElection({ from: owner });
            await election.endElection({ from: owner });
            const state = await election.electionState();
            assert.equal(state.toString(), "2", "Election state should be Ended");
        });
    });

    context("Voting", () => {
        beforeEach(async () => {
            await election.addCandidate("Candidate 1", { from: owner });
            await election.startElection({ from: owner });
        });

        it("should allow a user to vote", async () => {
            await election.vote(1, { from: voter1 });
            const candidate = await election.candidates(1);
            assert.equal(candidate.voteCount.toString(), "1", "Vote count should be 1");
        });

        it("should not allow a user to vote twice", async () => {
            await election.vote(1, { from: voter1 });
            await truffleAssert.reverts(
                election.vote(1, { from: voter1 }),
                "You have already voted"
            );
        });

        it("should not allow voting if the election is not running", async () => {
            await election.endElection({ from: owner });
            await truffleAssert.reverts(
                election.vote(1, { from: voter2 }),
                "Election is not in the correct state"
            );
        });
    });
});

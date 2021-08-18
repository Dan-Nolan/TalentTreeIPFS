const { assert } = require('chai');
describe('Game', function () {
    let game;
    let leveler, levelerSigner;
    beforeEach(async () => {
        const Game = await ethers.getContractFactory("Game");
        game = await Game.deploy();
        await game.deployed();

        leveler = (await ethers.provider.listAccounts())[1];
        levelerSigner = ethers.provider.getSigner(leveler);
    });

    it('should not allow a non-owner to run level up', async () => {
        let ex;
        try {
            await game.connect(levelerSigner).levelUp(leveler);
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "expected an error to be thrown!");
    });

    describe('before leveling up', () => {
        it('should not allow a talent to spent', async () => {
            let ex;
            try {
                await game.connect(levelerSigner).chooseTalent("1");
            }
            catch (_ex) {
                ex = _ex;
            }
            assert(ex, "expected an error to be thrown!");
        });
    });

    describe('after a levelup', () => {
        beforeEach(async () => {
            await game.levelUp(leveler);
        });

        it('should allow a talent to spent', async () => {
            await game.connect(levelerSigner).chooseTalent("1");
            assert(await game.talents(leveler, "1"));
        });
    });

    describe('after two levelups', () => {
        beforeEach(async () => {
            await game.levelUp(leveler);
            await game.levelUp(leveler);
        });

        it('should allow two talent to spent', async () => {
            await game.connect(levelerSigner).chooseTalent("1");
            await game.connect(levelerSigner).chooseTalent("2");
            assert(await game.talents(leveler, "1"));
            assert(await game.talents(leveler, "2"));
        });
    });
});

const { create } = require('ipfs-http-client')

const client = create();

(async () => {
  const shadow = {
    bonus: {
      stealth: 50
    }
  }
  const shadowCID = await client.dag.put(shadow);

  const redline = {
    bonus: {
      time: 1000
    }
  }
  const redlineCID = await client.dag.put(redline);

  const dexterity = {
    bonus: {
      dexterity: 100
    }
  }
  const dexterityCID = await client.dag.put(dexterity);

  const sing = {
    bonus: {
      focus: 100
    }
  }
  const singCID = await client.dag.put(sing);

  const lawyer = {
    class: "Lawyer",
    bonus: {
      logic: 100,
    },
    subskills: [redlineCID]
  }
  const lawyerCID = await client.dag.put(lawyer);

  const bard = {
    class: "Bard",
    bonus: {
      charisma: 100
    },
    subskills: [shadowCID, dexterityCID, singCID]
  }
  const bardCID = await client.dag.put(bard);

  const assassin = {
    class: "Assassin",
    bonus: {
      stealth: 100,
    },
    subskills: [shadowCID, dexterityCID]
  }
  const assassinCID = await client.dag.put(assassin);

  const dwarf = {
    class: "Dwarf",
    bonus: {
      strength: 100,
    },
    subskills: [dexterityCID, singCID]
  }
  const dwarfCID = await client.dag.put(dwarf);

  const classes = [dwarfCID, assassinCID, bardCID, lawyerCID];

  const classesCID = await client.dag.put(classes);

  console.log({
    shadowCID,
    redlineCID,
    singCID,
    dexterityCID
  });
})();

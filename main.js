// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};




const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,

    mutate() {
      const randomBase = this.dna[(Math.floor(Math.random() * 14))];

      const dnaBases = ['A', 'T', 'C', 'G'].filter(base => base !== randomBase);   // filter out the returned base letter
      this.dna[this.dna.indexOf(randomBase)] = dnaBases[Math.floor(Math.random() * 2)];   // set the base at index of randombase in the object array to a new random base letter value
    },

    compareDNA(diffObject) {   // check the percentage of DNA in common with another passed in creature object
      let counter = 0;

      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === diffObject.dna[i]) {
          counter++;
        }
      }

      console.log(`Specimen #${this.specimenNum} and specimen #${diffObject.specimenNum} have ${Math.round(counter / 15 * 100)}% DNA in common.`);
    },

    willLikelySurvive() {    // creature is only likely to survive if 60% of bases are C or G
      let counter = 0;
      this.dna.forEach(base => {
        if(base === "C" || base === "G") {
          counter++;
        }
      });

      return Math.round(counter / 15 * 100) >= 60 ? true : false;
    }
  };
};






const creaturesArray = (numberOfCreatures) => {   //create an array of creatures that survive for later study
  const creaturesArr = [];
  let creatureNumber = 1;

  while (creaturesArr.length < numberOfCreatures) {   //while the creatures array has less than 30 creatures, create more creatures and select for creatures that will survive
    const newCreature = pAequorFactory(creatureNumber, mockUpStrand());
    
    if(newCreature.willLikelySurvive) {
      creaturesArr.push(newCreature);
    }

    creatureNumber++;
  }

  return creaturesArr;
}



console.log(creaturesArray(30));
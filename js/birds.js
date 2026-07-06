function makeBirdDictionary(birds){

    const dict = {};

    birds.forEach(function(bird){

        const isPublic = String(bird.Public).trim().toUpperCase();

        if(isPublic !== "TRUE") return;

        dict[bird.BirdID] = bird;

    });

    return dict;
}
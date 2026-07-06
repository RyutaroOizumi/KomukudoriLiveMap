// ------------------------------------
// birds.csv を辞書化
// ------------------------------------

function makeBirdDictionary(birds){

    const dict = {};

    birds.forEach(function(bird){

        const isPublic =
            String(bird.Public)
            .trim()
            .toUpperCase();

        if(isPublic !== "TRUE") return;

        dict[bird.BirdID] = {

            BirdID: bird.BirdID,

            BirdName: bird.BirdName || "",

            Species: bird.Species || "",

            Sex: bird.Sex || "",

            ReleaseDate: bird.ReleaseDate || "",

            ReleaseSite: bird.ReleaseSite || "",

            Color: bird.Color || "#3388ff",

            Status: bird.Status || "",

            Photo: bird.Photo || "",

            Description: bird.Description || "",

            Distance: 0

        };

    });

    return dict;

}
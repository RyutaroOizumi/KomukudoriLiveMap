function loadCSV(file) {

    return new Promise((resolve) => {

        Papa.parse(file, {

            download: true,

            header: true,

            complete: function(results) {

                resolve(results.data);

            }

        });

    });

}
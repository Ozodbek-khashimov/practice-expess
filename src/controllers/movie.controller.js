import fs from "fs"
import path from "path"

const usersDataPath = process.cwd();
const pathh = path.join(usersDataPath, "src", "controllers", "movies.json");

const readData = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
        console.log(err);
    });

    console.log(data);

};

export const createMovie = (req, res) => {
    const movies = readData(pathh)
    const { movie, year, rating, genre } = req.body

    const newMovie = {
        id: movies.length + 1,
        movie,
        year,
        rating, genre
    }
    movies.push(newMovie)
    writeData(pathh, movies)
    res.status(201).json({ message: "kino muvaffaqiyatli qo'shildi!", movie: newMovie });
}

export const getAllMovie = (req, res) => {
    const movies = readData(pathh)
    if (movies.length == 0)
        return res.status(404).send({ error: "kinolar royxati bosh" })
    res.status(200).json({ movies });
}

export const getmovie = async (req, res) => {
    const movies = await readData(pathh)
    const { id } = req.params
    console.log(id);

    const movie = movies.find((movie) => movie.id == id)
    if (!movie)
        return res.status(404).json({ error: "kino topilmadi." });
    res.status(200).json(movie);

}

export const uptademovie = (req, res) => {
    const movies = readData(pathh); 
    const { id } = req.params; 
    const { movie, year, rating, genre } = req.body; 

    const movi = movies.find((movi) => movi.id === Number(id));
    if (!movi) {
        return res.status(404).json({ message: "Kino topilmadi!" }); 
    }

    if (movie) movi.movie = movie;
    if (year) movi.year = year;
    if (rating) movi.rating = rating;
    if (genre) movi.genre = genre;

    writeData(pathh, movies);

    res.status(200).json({ message: "Kino muvaffaqiyatli yangilandi!", updatedMovie: movi });
};


export const deleteMovie = (req, res) => {
    const movies = readData(pathh); 
    const { id } = req.params;
    const movieIndex = movies.findIndex((movi) => movi.id === Number(id)); 

    if (movieIndex === -1) {
        return res.status(404).json({ error: "Kino topilmadi." });
    }

    movies.splice(movieIndex, 1);

    writeData(pathh, movies);

    res.status(200).json({ message: "Kino muvaffaqiyatli o'chirildi!" });
};

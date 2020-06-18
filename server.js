const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkademy'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(2020, () => console.log('Server berjalan di port 2020'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM produk";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan id
app.get('/readbyid/:id', async (req, res) =>{
	const id = req.params.id;
	console.log(id);

	let sql = "SELECT * FROM produk Where id = "+ id +"";
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

//route untuk insert data
app.post('/api', (req, res) => {
	let action = req.body.action;
	let data = {id: req.body.id, nama_produk: req.body.nama_produk, keterangan: req.body.keterangan, harga: req.body.harga, jumlah: req.body.jumlah};
	let sql;

	if(action === 'Simpan'){
		sql = "INSERT INTO produk SET ?";	
	}else{
		sql = `UPDATE produk SET nama_produk='`+req.body.nama_produk+`', 
		        keterangan='`+req.body.keterangan+`', harga='`+ req.body.harga +`', jumlah='`+ req.body.jumlah +`' 
		        WHERE id='`+req.body.id+`';`
	}
	
	console.log(sql);
	let query = conn.query(sql, data,(err, results) => {
	   if(err) throw err;
	   res.json(results);
	   console.log(results);
	});
});

//Baca Data Berdasarkan id
app.get('/hapus/:id', async (req, res) =>{
	const id = req.params.id;
	console.log(id);

	let sql = `DELETE FROM produk Where id = '`+ id +`';`
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

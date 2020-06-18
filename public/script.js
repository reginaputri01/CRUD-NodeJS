getData();
async function getData(){
	const response = await fetch('/read');
	const json = await response.json();
	console.log(json);
	showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

	const action = btnSave.textContent;
	const id    = document.getElementById('id').value;
	const nama_produk   = document.getElementById('nama_produk').value;
	const keterangan = document.getElementById('keterangan').value;
	const harga   = document.getElementById('harga').value;
	const jumlah   = document.getElementById('jumlah').value;

	let data = {
		id : id,
		nama_produk : nama_produk,
		keterangan : keterangan,
		harga : harga,
		jumlah : jumlah,
		action : action
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	const response = await fetch('/api', options);
	const json = await response.json();
	console.log(json);
	
	getData();

	$('#exampleModal').modal('hide');

	if(action === 'Simpan'){
		$.alert('Data Berhasil ditambah!');
	}else{
		$.alert('Data Berhasil dirubah!');
	}
});

function showData(json){
	let tr = '';
	let no;
	$('#databody').html('');
	for (let i = 0; i < json.length; i++) {
		no = i + 1;
		tr = $('<tr/>');
		tr.append("<td>" + json[i].id + "</td>");
		tr.append("<td>" + json[i].nama_produk + "</td>");
		tr.append("<td>" + json[i].keterangan + "</td>");
		tr.append("<td>" + json[i].harga + "</td>");
		tr.append("<td>" + json[i].jumlah + "</td>");
		tr.append(`
			<td>
				<button type="button" class="badge badge-primary badge-pill btnEdit" data-id="`+ json[i].id +`">
					Edit
				</button>
				<button type="button" class="badge badge-danger badge-pill btnHapus" data-id="`+ json[i].id +`">
					Hapus
				</button>
			</td>`
		);
		$('#databody').append(tr);
	}

	//Jquery Selector
	$(function(){
		$('.btnTambahData').on('click', function(){
			document.getElementById('id').readOnly = false;
			document.getElementById('id').value = '';
			document.getElementById('nama_produk').value = '';
			document.getElementById('keterangan').value = '';
			document.getElementById('harga').value = '';
			document.getElementById('jumlah').value = '';

	        $('#exampleModalLabel').html('Tambah Data Produk');
	        $('.modal-footer button[id=btn_save]').html('Simpan');
	    });

		$('.btnEdit').on('click', async function(){
		    let id = $(this).data('id');
		    console.log(id);


		    const url = `readbyid/${id}`;
			const response = await fetch(url);
			const json = await response.json();
			console.log(json[0].id);

			document.getElementById('id').readOnly = true;
			document.getElementById('id').value = json[0].id;
			document.getElementById('nama_produk').value = json[0].nama_produk;
			document.getElementById('keterangan').value = json[0].keterangan;
			document.getElementById('harga').value = json[0].harga;
			document.getElementById('jumlah').value = json[0].jumlah;

		    $('#exampleModalLabel').html('Ubah Data Produk');
        	$('.modal-footer button[id=btn_save]').html('Ubah Data');
		    $('#exampleModal').modal('show');
		});

		$('.btnHapus').on('click', async function(){
			let id = $(this).data('id');

			$.confirm({
			    title: 'Hapus Data Produk',
			    content: 'Apakah Anda Yakin?',
			    buttons: {
			        ya: {
			        	text: 'YA',
			            btnClass: 'btn-blue',
			            action: async function(){
			                const url = `hapus/${id}`;
							const response = await fetch(url);
							const json = await response.json();
			            	$.alert('Data Berhasil dihapus!');
			            	getData();
			            }
			        },
			        tidak: function () {
			            
			        }
			    }
			});
		});
	})
}
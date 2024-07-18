//ini untuk validasi jenis kelamin
function cekJenisKelamin() {
    const manSelect = document.getElementById("selection-man").checked;
    const womanSelect = document.getElementById("selection-woman").checked;
    return !manSelect && !womanSelect
}
// ini untuk validasi input gender
function validasiInput() {
    const input = document.querySelectorAll("input");
    let isValid = true;
    for (const node of input) {
        if (node.name === 'gender' ? cekJenisKelamin() : !node.value) {
            alert(node.placeholder)
            isValid = false;
            break;
        }
    }
    return isValid
}
function updateHasil() {
    if (validasiInput()) {
        // agar kalau user mengisi angka maka consol akan berubah dari 0 yang kemudian memunculkan angka yang dimasukkan
        let nilaiBb = document.getElementById('input-berat-badan').value;
        let nilaiUmur = document.getElementById('input-umur').value;
        let nilaiTb = document.getElementById('input-tinggi-badan').value;
        // pakai parse agar mengubah string jadi int
        console.log(parseInt(nilaiBb));
        const nilai = nilaiBb / Math.pow(nilaiTb / 100, 2)
        const result = bmi(nilai)

        // agar nilai result berubah mengikuti inputan
        document.querySelector("section.main-content.result-content").style.display = ''
        document.getElementById('hasil-bmi').innerHTML = nilai.toFixed(1)
        document.getElementById('hasil-bmi-judul').innerHTML = result.title
        document.getElementById('hasil-bmi-kesimpulan').innerHTML = result.short
        document.getElementById('hasil-bmi-detail').innerHTML = result.long
        document.getElementById('bmi-penyakit').innerHTML = result.penyakit
        document.getElementById('bmi-daftar').innerHTML = "<ul>" + result.daftarpenyakit.join("<li>") + "</ul>"
    }
}

// untuk reset data
function resetData() {
    document.querySelector("section.main-content.result-content").style.display = 'none';
    const input = document.querySelectorAll("input");
    for (const node of input) {
        if (node.type === 'radio') {
            node.checked = false
        } else {
            node.value = null;
        }
    }
}

// untuk menentukan nilai bmi
function bmi(nilai) {
    if (nilai < 18.5) {
        return klasifikasi().kurus
    } else if (nilai < 24.9) {
        return klasifikasi().ideal
    } else if (nilai < 29.9) {
        return klasifikasi().gemuk
    } else {
        return klasifikasi().obesitas
    }
}


/**
 * menggunakan fungsi daripada variable adalah agar hoisting
 * @link https://www.javascripttutorial.net/javascript-hoisting/
 */
function klasifikasi() {
    return {
        "kurus": {
            title: "Indeks Massa Tubuh Anda",
            short: "Anda Memiliki Berat Badan Kurus",
            long:
                `Pertahankan pola makan yang sehat dengan memperhatikan asupan nutrisi yang cukup. 
                Jika Anda memiliki kekhawatiran tentang berat badan, konsultasikan dengan ahli gizi.`,
            daftarpenyakit: ["Malnutrisi", "Anemia", "Osteoporosis"],
            penyakit: "Beberapa penyakit yang berasal dari kurus:"
        },
        "ideal": {
            title: "Indeks Massa Tubuh Anda",
            short: "Anda Memiliki Berat Badan Ideal",
            long: `Lanjutkan gaya hidup sehat Anda dengan menjaga pola makan seimbang dan rutin berolahraga.
            Periksakan kesehatan secara teratur untuk memastikan kondisi tubuh yang baik.`,
            daftarpenyakit: [],
            penyakit: "Tidak ada penyakit spesifik terkait berat badan"
        },
        "gemuk": {
            title: "Indeks Massa Tubuh Anda",
            short: "Anda Memiliki Berat Badan Gemuk",
            long: `Pertimbangkan untuk menurunkan berat badan secara sehat melalui perubahan pola makan dan 
            peningkatan aktivitas fisik.Konsultasikan dengan ahli gizi untuk bantuan lebih lanjut.`,
            daftarpenyakit: ["Hipertensi", "Kolesterol Tinggi", "Diabetes Tipe 2"],
            penyakit: "Beberapa penyakit yang berasal dari gemuk :"
        },
        "obesitas": {
            title: "Indeks Massa Tubuh Anda",
            short: "Anda Memiliki Berat Badan Obesitas",
            long: `Penting untuk mencari bantuan profesional untuk mengelola obesitas.
            Dokter atau ahli gizi dapat memberikan panduan dan dukungan yang diperlukan untuk mencapai 
            berat badan yang sehat.`,
            daftarpenyakit: ["Penyakit Jantung", "Sleep Apnea", "Diabetes Tipe 2"],
            penyakit: "Beberapa penyakit yang berasal dari obesitas :"
        }
    }
}
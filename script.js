const menuItems = [
    { name: 'Ayam Geprek', price: 6000, image: 'geprek.jpeg' },
    { name: 'Ayam Ciken', price: 5000, image: 'ciken.jpeg' },
    { name: 'Seblak', price: 5000, image: 'seblak.jpg' },
    { name: 'Nasi', price: 1500, image: 'nasi.jpg' },
    { name: 'Kerupuk', price: 1000, image: 'kerupuk.jpeg' },
    { name: 'Gorengan', price: 1000, image: 'gorengan.jpeg' },
    { name: 'Jajan', price: 500, image: 'jajan.jpeg' },
    { name: 'Tea jus', price: 1000, image: 'teajus.jpeg' },
    { name: 'Air Jeruk', price: 1500, image: 'jeruk.jpeg' },
    { name: 'Teh Tubruk', price: 1500, image: 'teh.jpeg' }
];

let total = 0;
let orderList = {}; // Objek untuk melacak jumlah setiap item

function createMenu() {
    const menuDiv = document.getElementById('menu');
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'menu-item'; 

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'menu-img'; 

        const text = document.createElement('span');
        text.textContent = `${item.name} - Rp ${item.price}`;

        button.appendChild(img);
        button.appendChild(text);
        button.onclick = () => addItem(item);
        menuDiv.appendChild(button);
    });
}

function addItem(item) {
    // Jika item sudah ada dalam pesanan, tambah jumlahnya
    if (orderList[item.name]) {
        orderList[item.name].count++;
    } else {
        // Jika belum, tambahkan item dengan jumlah 1
        orderList[item.name] = { price: item.price, count: 1, image: item.image };
    }

    updateOrderList();
}

function updateOrderList() {
    const orderListElement = document.getElementById("orderList");
    orderListElement.innerHTML = ''; // Kosongkan daftar pesanan

    total = 0; // Reset total

    for (let itemName in orderList) {
        const item = orderList[itemName];
        const listItem = document.createElement("li");

        // Tambahkan gambar item
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = itemName;
        img.className = 'order-img';
        
        // Tambahkan teks deskripsi item
        const text = document.createElement('span');
        text.textContent = `${itemName} x ${item.count} - Rp ${item.price * item.count}`;

        // Tambahkan gambar dan teks ke elemen list item
        listItem.appendChild(img);
        listItem.appendChild(text);

        // Tambahkan elemen list item ke daftar pesanan
        orderListElement.appendChild(listItem);

        total += item.price * item.count;
    }

    document.getElementById("total").textContent = total;
}

function resetOrder() {
    orderList = {}; // Kosongkan pesanan
    total = 0; // Atur ulang total

    document.getElementById("orderList").innerHTML = ''; // Kosongkan daftar tampilan
    document.getElementById("total").textContent = total; // Perbarui tampilan total
}

// Inisialisasi menu saat halaman dimuat
createMenu();
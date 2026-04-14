// 🐄 Class الحيوان
class Animal {
  constructor(type, age, health) {
    this.id = Date.now();
    this.type = type;
    this.age = age;
    this.health = health;
  }
}

// 👷 Class العامل
class Worker {
  constructor(name, job, salary) {
    this.id = Date.now();
    this.name = name;
    this.job = job;
    this.salary = salary;
  }
}

// 🏡 النظام كامل
class FarmSystem {
  constructor() {
    this.animals = JSON.parse(localStorage.getItem("animals")) || [];
  }

  addAnimal(animal) {
    this.animals.push(animal);
    this.save();
  }

  deleteAnimal(id) {
    this.animals = this.animals.filter(a => a.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem("animals", JSON.stringify(this.animals));
  }

  displayAnimals() {
    const list = document.getElementById("animalList");
    list.innerHTML = "";

    this.animals.forEach(animal => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${animal.type} - عمر: ${animal.age} - صحة: ${animal.health}
        <button onclick="deleteAnimal(${animal.id})">❌</button>
      `;
      list.appendChild(li);
    });
  }
}

// تشغيل النظام
const farm = new FarmSystem();

// إضافة حيوان
function addAnimal() {
  const type = document.getElementById("type").value;
  const age = document.getElementById("age").value;
  const health = document.getElementById("health").value;

  if (!type || !age || !health) {
    alert("املأ كل الحقول");
    return;
  }

  const animal = new Animal(type, age, health);
  farm.addAnimal(animal);
  farm.displayAnimals();
}

// حذف
function deleteAnimal(id) {
  farm.deleteAnimal(id);
  farm.displayAnimals();
}

// عرض عند تحميل الصفحة
farm.displayAnimals();

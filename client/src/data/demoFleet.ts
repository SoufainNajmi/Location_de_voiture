export type VehicleCategory = 'SUV' | 'Berline' | 'Sportive' | 'Électrique'

export type DemoVehicle = {
  id: string
  brand: string
  model: string
  category: VehicleCategory
  year: number
  pricePerDay: number
  city: string
  transmission: string
  fuelType: string
  seats: number
  image: string
  featured: boolean
  isAvailable: boolean
}

export const demoFleet: DemoVehicle[] = [
  {
    id: 'porsche-911',
    brand: 'Porsche',
    model: '911 Carrera',
    category: 'Sportive',
    year: 2025,
    pricePerDay: 690,
    city: 'Paris',
    transmission: 'Automatique',
    fuelType: 'Essence',
    seats: 4,
    featured: true,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'range-rover-sport',
    brand: 'Range Rover',
    model: 'Sport Autobiography',
    category: 'SUV',
    year: 2025,
    pricePerDay: 520,
    city: 'Nice',
    transmission: 'Automatique',
    fuelType: 'Hybride',
    seats: 5,
    featured: true,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'mercedes-classe-s',
    brand: 'Mercedes-Benz',
    model: 'Classe S',
    category: 'Berline',
    year: 2025,
    pricePerDay: 440,
    city: 'Lyon',
    transmission: 'Automatique',
    fuelType: 'Hybride',
    seats: 5,
    featured: true,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'tesla-model-s',
    brand: 'Tesla',
    model: 'Model S',
    category: 'Électrique',
    year: 2025,
    pricePerDay: 310,
    city: 'Bordeaux',
    transmission: 'Automatique',
    fuelType: 'Électrique',
    seats: 5,
    featured: true,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'bmw-x5',
    brand: 'BMW',
    model: 'X5 xDrive40i',
    category: 'SUV',
    year: 2024,
    pricePerDay: 480,
    city: 'Paris',
    transmission: 'Automatique',
    fuelType: 'Essence',
    seats: 5,
    featured: false,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'audi-a6',
    brand: 'Audi',
    model: 'A6 Avant',
    category: 'Berline',
    year: 2024,
    pricePerDay: 355,
    city: 'Nice',
    transmission: 'Automatique',
    fuelType: 'Diesel',
    seats: 5,
    featured: false,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan 4S',
    category: 'Électrique',
    year: 2025,
    pricePerDay: 490,
    city: 'Lyon',
    transmission: 'Automatique',
    fuelType: 'Électrique',
    seats: 4,
    featured: false,
    isAvailable: true,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 'bmw-m4',
    brand: 'BMW',
    model: 'M4 Competition',
    category: 'Sportive',
    year: 2025,
    pricePerDay: 575,
    city: 'Bordeaux',
    transmission: 'Automatique',
    fuelType: 'Essence',
    seats: 4,
    featured: false,
    isAvailable: false,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=900&q=85',
  },
]

export const featuredFleet = demoFleet.filter((vehicle) => vehicle.featured)

export const vehicleCategories: {
  id: VehicleCategory
  description: string
  image: string
}[] = [
  {
    id: 'SUV',
    description: 'Espace et élégance',
    image: demoFleet[1].image,
  },
  {
    id: 'Berline',
    description: 'Le confort en mouvement',
    image: demoFleet[2].image,
  },
  {
    id: 'Sportive',
    description: 'Le plaisir de conduire',
    image: demoFleet[0].image,
  },
  {
    id: 'Électrique',
    description: 'Une nouvelle énergie',
    image: demoFleet[3].image,
  },
]

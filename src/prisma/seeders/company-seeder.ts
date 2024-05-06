import slugify from 'slugify'

const companiesData: any = [
  {
    name: 'Wings',
    location: 'Jakarta, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Consumer goods',
    logo: 'wings.png',
  },
  {
    name: 'Bio Farma',
    location: 'Bandung, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Healthcare',
    logo: 'bio-farma.webp',
  },
  {
    name: 'Greenfields',
    location: 'Bogor, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Consumer goods',
    logo: 'greenfields.png',
  },
  {
    name: 'Jalur Nugraha Ekakurir',
    location: 'Jakarta, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Industrials',
    logo: 'jne.jpg',
  },
  {
    name: 'Indosat',
    location: 'Bekasi, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Telecommunications',
    logo: 'indosat.jpg',
  },
  {
    name: 'Dicoding',
    location: 'Bandung, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Technology',
    logo: 'dicoding.jpeg',
  },
  {
    name: 'Medco Energi',
    location: 'Papua, Indonesia',
    about:
      'Sunt ipsum Lorem exercitation eu reprehenderit cupidatat exercitation anim cillum adipisicing reprehenderit velit aliquip. Excepteur enim aliqua sunt nostrud nostrud velit magna in consectetur deserunt magna. Reprehenderit aute ex consequat pariatur reprehenderit.',
    industry: 'Oil & Gas',
    logo: 'medco-energi.png',
  },
  {
    name: 'Alfamart',
    location: 'Semarang, Indonesia',
    about:
      'Commodo est proident quis incididunt Lorem dolore. Elit tempor exercitation nisi id anim ut est incididunt pariatur amet exercitation nulla. In nisi consequat anim aute et sunt reprehenderit ex nulla non. Duis dolore nisi pariatur excepteur veniam anim nulla minim quis incididunt et proident aute nulla.',
    industry: 'Retail',
    logo: 'alfamart.webp',
  },
  {
    name: 'Amazon Indonesia',
    location: 'Jakarta, Indonesia',
    about:
      'Lorem fugiat minim pariatur irure eiusmod nisi ipsum magna exercitation pariatur deserunt magna. Mollit aliqua proident ex id in exercitation eu officia culpa tempor. Est id est quis Lorem nulla dolor minim magna. Reprehenderit et cillum in ullamco anim consequat ut. Magna dolore laboris eiusmod consectetur culpa elit laborum sit do esse. Tempor eu culpa eu est aliquip sint irure excepteur ex.',
    industry: 'Marketplace Startup',
    logo: 'amazon.jpg',
  },
  {
    name: 'Danone',
    location: 'Bandung, Indonesia',
    about:
      'Voluptate cillum amet aute dolor incididunt esse esse dolore ex sunt anim irure ullamco labore. Duis esse pariatur aute do ea reprehenderit. Officia elit pariatur ullamco ullamco qui nostrud ullamco proident tempor ea anim consequat eiusmod. Veniam excepteur cillum eiusmod sunt commodo dolore deserunt nulla tempor dolore. Exercitation aute tempor consectetur elit reprehenderit fugiat pariatur aliqua ut. Qui duis id cillum ea occaecat eu. Voluptate deserunt laboris ea nostrud nulla eiusmod eiusmod consequat velit amet.',
    industry: 'Consumer goods',
    logo: 'danone.png',
  },
  {
    name: 'Indomaret',
    location: 'Jakarta, Indonesia',
    about:
      'Nisi laboris sit et exercitation nisi. Aliqua proident ullamco qui aliquip laborum. Mollit minim aliqua id culpa consectetur ut ut magna ad reprehenderit nostrud nisi ad. Anim adipisicing consectetur consectetur esse ad in eiusmod dolore Lorem. Minim dolor nisi id nulla in ut amet qui dolore.',
    industry: 'Retail',
    logo: 'indomaret.png',
  },
  {
    name: 'Kahf',
    location: 'Bogor, Indonesia',
    about:
      'Do et ut qui reprehenderit cillum. Id laborum excepteur enim consectetur elit cupidatat reprehenderit occaecat velit est in incididunt do. Tempor in culpa aliqua cillum minim dolor sit ipsum. Ea velit ullamco aliquip voluptate aliquip deserunt tempor mollit exercitation.',
    industry: 'Consumer goods',
    logo: 'kahf.jpg',
  },
  {
    name: 'Lawson',
    location: 'Jakarta, Indonesia',
    about:
      'Cupidatat quis et nostrud irure quis non. Laborum exercitation ex ex mollit id pariatur quis aliquip excepteur eiusmod magna nostrud. Aliqua dolore nulla Lorem ad proident ea sint qui occaecat ullamco enim cillum minim dolore.',
    industry: 'Retail',
    logo: 'lawson.jpg',
  },
  {
    name: 'Lippo Group',
    location: 'Bekasi, Indonesia',
    about:
      'Irure dolore laborum consequat tempor exercitation labore amet cupidatat consequat fugiat consequat laborum sunt. Quis exercitation pariatur excepteur ad fugiat ipsum excepteur dolor amet deserunt amet officia quis. Commodo culpa sit eu aliqua Lorem veniam reprehenderit consequat velit.',
    industry: 'Real Estate',
    logo: 'lippo-group.jpg',
  },
  {
    name: 'Matahari',
    location: 'Jakarta, Indonesia',
    about:
      'Irure dolore laborum consequat tempor exercitation labore amet cupidatat consequat fugiat consequat laborum sunt. Quis exercitation pariatur excepteur ad fugiat ipsum excepteur dolor amet deserunt amet officia quis. Commodo culpa sit eu aliqua Lorem veniam reprehenderit consequat velit.',
    industry: 'Retail',
    logo: 'matahari.webp',
  },
  {
    name: 'Pertamina',
    location: 'Jakarta, Indonesia',
    about:
      'Irure dolore laborum consequat tempor exercitation labore amet cupidatat consequat fugiat consequat laborum sunt. Quis exercitation pariatur excepteur ad fugiat ipsum excepteur dolor amet deserunt amet officia quis. Commodo culpa sit eu aliqua Lorem veniam reprehenderit consequat velit.',
    industry: 'Oil & Gas',
    logo: 'pertamina.png',
  },
  {
    name: 'Telkom Indonesia',
    location: 'Jakarta, Indonesia',
    about:
      'Irure dolore laborum consequat tempor exercitation labore amet cupidatat consequat fugiat consequat laborum sunt. Quis exercitation pariatur excepteur ad fugiat ipsum excepteur dolor amet deserunt amet officia quis. Commodo culpa sit eu aliqua Lorem veniam reprehenderit consequat velit.',
    industry: 'Telecommunication',
    logo: 'telkom.png',
  },
  {
    name: 'Unilever',
    location: 'Jakarta, Indonesia',
    about:
      'Irure dolore laborum consequat tempor exercitation labore amet cupidatat consequat fugiat consequat laborum sunt. Quis exercitation pariatur excepteur ad fugiat ipsum excepteur dolor amet deserunt amet officia quis. Commodo culpa sit eu aliqua Lorem veniam reprehenderit consequat velit.',
    industry: 'Consumer goods',
    logo: 'unilever.jpg',
  },
]

companiesData.forEach((company: any) => {
  company.slug = slugify(company.name, {
    lower: true,
  })
})

export default companiesData

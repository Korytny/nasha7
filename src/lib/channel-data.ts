import hero from '@/assets/hero.jpg.asset.json';
import dinner from '@/assets/dinner.jpg.asset.json';
import morning from '@/assets/morning.jpg.asset.json';
import kids from '@/assets/kids.jpg.asset.json';
import love from '@/assets/love.jpg.asset.json';
import cooking from '@/assets/cooking.jpg.asset.json';
import host1 from '@/assets/host1.jpg.asset.json';
import host2 from '@/assets/host2.jpg.asset.json';
import host3 from '@/assets/host3.jpg.asset.json';
import studio from '@/assets/studio.jpg.asset.json';
export const images = {hero:hero.url,dinner:dinner.url,morning:morning.url,kids:kids.url,love:love.url,cooking:cooking.url,studio:studio.url};
export const programs = [
 {name:'Семейный ужин',category:'Вечерние',image:images.dinner,tag:'О самом важном за одним столом',time:'19:00',episodes:128,rating:'4.9',description:'Готовим вместе, делимся историями и собираем всю семью за одним столом.'},
 {name:'Утро с 7Я',category:'Утренние',image:images.morning,tag:'Каждый день — доброе начало',time:'07:00',episodes:240,rating:'4.8',description:'Хорошие новости, вдохновение и маленькие радости для большого дня.'},
 {name:'Детский час',category:'Детские',image:images.kids,tag:'Большой мир маленьких открытий',time:'16:00',episodes:96,rating:'4.9',description:'Играем, исследуем мир и учимся замечать удивительное вместе с детьми.'},
 {name:'Истории любви',category:'Документальные',image:images.love,tag:'Настоящие чувства. Настоящие люди.',time:'21:00',episodes:54,rating:'5.0',description:'Трогательные истории о встречах, верности и любви длиною в жизнь.'},
 {name:'Бабушкин рецепт',category:'Дневные',image:images.cooking,tag:'Вкус, который возвращает домой',time:'13:00',episodes:82,rating:'4.9',description:'Семейные рецепты, передающиеся из поколения в поколение.'},
 {name:'Родительский час',category:'Дневные',image:images.hero,tag:'Растём вместе с нашими детьми',time:'14:00',episodes:112,rating:'4.8',description:'Открытый разговор о воспитании, доверии и поддержке с экспертами и родителями.'},
];
export const hosts = [
 {name:'Анна Соколова',show:'Семейный ужин',image:host1.url,bio:'Верит, что самые важные разговоры начинаются на кухне. Делится семейными традициями и знакомит зрителей с удивительными людьми.'},
 {name:'Михаил Волков',show:'Утро с 7Я',image:host2.url,bio:'Начинает каждый день с улыбки. Любит путешествия, добрые новости и искренние разговоры.'},
 {name:'Елена Миронова',show:'Родительский час',image:host3.url,bio:'Разговаривает о сложном просто. Вместе с приглашёнными экспертами помогает семьям слышать и понимать друг друга.'},
];
export const timeline = [
 {year:'2010',title:'Начало большой семьи',text:'Идея телеканала, где главное — люди и их близкие.'},
 {year:'2015',title:'Первый эфир',text:'Первые программы и первые встречи с нашими зрителями.'},
 {year:'2020',title:'Миллион зрителей',text:'Истории, которые объединяют семьи по всей стране.'},
 {year:'2024',title:'Новый взгляд',text:'Обновлённый образ. Те же искренность и тепло.'},
 {year:'2026',title:'Семья становится больше',text:'Новые лица, программы и ещё больше поводов быть вместе.'},
];
export function filterPrograms(category:string){return category==='Все программы'?programs:programs.filter(p=>p.category===category)}

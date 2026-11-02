export const peso=n=>'₱'+n.toLocaleString('en-PH');
export const CATS=['Haircuts','Beard & Shave','Treatments'];
export const IC={'Haircuts':'sc','Beard & Shave':'rz','Treatments':'cb','Packages':'pl'};
export const S=[
{id:'classic',n:'Classic Haircut',d:'Traditional scissor and clipper cut',p:150,m:30,c:'Haircuts'},
{id:'fade',n:'Low / Mid / High Fade',d:'Precision fade haircut',p:180,m:45,c:'Haircuts'},
{id:'skin',n:'Skin Fade',d:'Clean skin-level fade',p:200,m:45,c:'Haircuts'},
{id:'crop',n:'Textured Crop',d:'Modern textured hairstyle',p:220,m:45,c:'Haircuts'},
{id:'buzz',n:'Buzz Cut',d:'Uniform clipper cut',p:120,m:20,c:'Haircuts'},
{id:'beard',n:'Beard Trim',d:'Beard shaping and cleanup',p:100,m:20,c:'Beard & Shave'},
{id:'shave',n:'Hot Towel Shave',d:'Traditional straight razor shave',p:180,m:30,c:'Beard & Shave'},
{id:'wash',n:'Hair Wash',d:'Shampoo and conditioning',p:60,m:15,c:'Treatments'},
{id:'color',n:'Hair Coloring',d:'Basic hair color service',p:450,m:90,c:'Treatments'},
{id:'fresh',n:'Fresh Start',d:'Classic Haircut + Hair Wash',p:190,m:45,c:'Packages',pk:1,sv:'₱20',fd:1},
{id:'exec',n:'Executive Groom',d:'Skin Fade + Beard Trim',p:270,m:60,c:'Packages',pk:1,sv:'₱30',fd:1},
{id:'gent',n:'Complete Gentleman',d:'Haircut + Beard Trim + Hot Towel',p:390,m:90,c:'Packages',pk:1,sv:'₱40',fd:1},
{id:'student',n:'Student Cut',d:'Classic Haircut. Valid student ID required at the branch.',p:120,m:30,c:'Packages',pk:1,sv:'₱30',st:1},
{id:'combo',n:'Hair & Beard Combo',d:'Haircut and beard grooming',p:250,m:60,c:'Packages',pk:1,sv:'₱0'}];
export const BR=[
{id:'central',n:'Santa Rosa Central',a:'Placeholder: 123 Sample St., Santa Rosa, Laguna',t:'(049) 000-0001',b:['James Carter','Marcus Reid','Daniel Brooks'],ph:['https://i.pinimg.com/736x/3e/57/6b/3e576bcd6dd6b09161f1c63037939515.jpg','https://i.pinimg.com/736x/7a/d0/92/7ad092abc6a8a1ce97082f5b18756505.jpg','https://i.pinimg.com/236x/18/14/8d/18148d3e08e17bfa960d7281d2244af0.jpg'],img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjTC818wR0O-wSgodz4KpEwMF1jpVcRGKrQwDW98zf895ixci8MwN27Fv&s=10'},
{id:'nuvali',n:'Nuvali',a:'Placeholder: Sample Ave., Nuvali, Santa Rosa, Laguna',t:'(049) 000-0002',b:['Ethan Walker','Lucas Meyer'],ph:['https://thumbs.dreamstime.com/b/vertical-grayscale-shot-young-barber-holding-scissors-front-his-face-vertical-grayscale-shot-young-barber-200079091.jpg','https://images.pexels.com/photos/5337959/pexels-photo-5337959.jpeg?cs=srgb&dl=pexels-alexandre-saraiva-carniato-583650-5337959.jpg&fm=jpg'],img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_0Nze-7w4YPpSFdciOvLf3nbW-V91jZxXDdqLpWY_GChIfMVT58to5Nd&s=10'},
{id:'balibago',n:'Balibago',a:'Placeholder: Sample Rd., Balibago, Santa Rosa, Laguna',t:'(049) 000-0003',b:['Oliver Grant'],ph:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3aaij9tMnv8p0PEbqDH7caaZN5l-oX3oIYp_BlkG47myNbYxWT3BK3eD&s=10'],img:'https://png.pngtree.com/thumb_back/fh260/background/20241116/pngtree-high-end-barber-shop-with-sleek-contemporary-interior-design-image_16612351.jpg'}];
export const AWARDS=[['BEST','BARBER','SANTA ROSA · 2025'],['BEST','FADE','LAGUNA · 2024'],['TOP','GROOMING','READERS’ CHOICE · 2025'],['BEST','NEW SHOP','CALABARZON · 2022']];
export const REVIEWS=[
{l:'A',n:'Miguel S.',r:'Marketing Lead, Northgate Coffee Co.',q:'“Clean fade, no rush, and the shop actually feels premium.”',s:'★★★★★',u:'https://img.magnific.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?semt=ais_hybrid&w=740&q=80'},
{l:'B',n:'Daniel R.',r:'Real Estate Agent, Harborline Realty',q:'“Booked four of us before a client event and everyone got a slot.”',s:'★★★★★',u:'https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg='},
{l:'C',n:'Paolo A.',r:'Software Engineer, Brightwave Studio',q:'“A quick, clean cut between meetings. Booking online took a minute.”',s:'★★★★☆',u:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbu7XMQ_QudWJy4Ot-pHomofGI3xoxUt3PXrLmq5KJaGcswnYn1vDfq40&s=10'}];

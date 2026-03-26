import { NicknameData } from '@/types/nickname';

export const nicknameData: NicknameData = {
  korean: {
    adjectives: [
      // 외모/상태
      '멋진', '예쁜', '귀여운', '잘생긴', '화려한', '소박한', '단정한', '깔끔한', '청초한', '늠름한',
      // 성격/능력
      '똑똑한', '용감한', '친절한', '다정한', '씩씩한', '야무진', '듬직한', '꾸준한', '성실한', '재치있는',
      '지혜로운', '당당한', '겸손한', '정직한', '느긋한', '꼼꼼한', '대범한', '활발한', '차분한', '너그러운',
      // 감각/온도
      '시원한', '따뜻한', '밝은', '어두운', '빠른', '느린', '강한', '약한', '큰', '작은',
      '높은', '낮은', '깨끗한', '새로운', '젊은', '가벼운', '무거운', '날카로운', '부드러운', '거친',
      // 감정
      '행복한', '슬픈', '화난', '놀란', '활기찬', '설레는', '뿌듯한', '편안한', '즐거운', '상쾌한',
      '신나는', '포근한', '아늑한', '유쾌한', '통쾌한', '후련한', '담담한', '평온한', '고요한', '잔잔한',
      // 분위기/특성
      '조용한', '시끄러운', '달콤한', '매운', '순한', '신비한', '평범한', '특별한', '완벽한', '자유로운',
      '투명한', '영롱한', '은은한', '선명한', '깊은', '얕은', '넓은', '좁은', '둥근', '뾰족한',
      // 동작형
      '웃는', '춤추는', '노래하는', '뛰어노는', '잠자는', '꿈꾸는', '생각하는', '바라보는', '기다리는',
      '사랑하는', '좋아하는', '원하는', '소중한', '귀한', '반짝이는', '빛나는', '흔들리는', '떠다니는',
      '날아가는', '걸어가는', '달려가는', '헤엄치는', '구르는', '솟아오르는',
      // 색상
      '하얀', '까만', '빨간', '파란', '노란', '초록', '보라', '분홍', '주황', '은빛',
      '금빛', '하늘빛', '연두빛', '청록빛', '무지개빛'
    ],
    nouns: [
      // 동물
      '고양이', '강아지', '토끼', '햄스터', '새', '물고기', '거북이', '다람쥐', '여우', '늑대',
      '사자', '호랑이', '곰', '판다', '코끼리', '기린', '원숭이', '돌고래', '고래', '상어',
      '펭귄', '수달', '나비', '잠자리', '무당벌레', '꿀벌', '반딧불이', '부엉이', '독수리', '제비',
      '두루미', '앵무새', '카멜레온', '해파리', '문어', '게', '불가사리', '달팽이', '코알라', '알파카',
      '라쿤', '미어캣', '치타', '표범', '하마', '사슴', '고슴도치', '오리', '백조', '참새',
      // 자연/천체
      '별', '달', '해', '구름', '비', '눈', '바람', '천둥', '번개', '무지개',
      '꽃', '나무', '잎', '열매', '씨앗', '숲', '산', '하늘', '대지', '안개',
      '이슬', '서리', '노을', '새벽', '여명', '황혼', '오로라', '유성', '은하', '행성',
      // 장소
      '바다', '강', '호수', '섬', '동굴', '길', '다리', '집', '성', '탑',
      '정원', '초원', '들판', '계곡', '폭포', '절벽', '해변', '항구', '등대', '오두막',
      // 사물/일상
      '책', '펜', '종이', '컴퓨터', '시계', '안경', '모자', '가방', '우산', '열쇠',
      '거울', '촛불', '편지', '일기', '지도', '나침반', '망원경', '풍선', '연', '종',
      // 문화/예술
      '음악', '노래', '춤', '그림', '사진', '영화', '게임', '운동', '요리', '여행',
      '시', '소설', '만화', '피아노', '기타', '드럼', '바이올린', '플루트', '붓', '물감',
      // 추상/감정
      '꿈', '희망', '사랑', '우정', '평화', '자유', '행복', '기쁨', '웃음', '미소',
      '약속', '비밀', '추억', '모험', '도전', '기적', '선물', '축제', '이야기', '노력',
      // 음식
      '떡볶이', '붕어빵', '호떡', '인절미', '솜사탕', '마카롱', '초콜릿', '젤리', '쿠키', '푸딩',
      // 의성어/의태어
      '소근소근', '쿨쿨', '방긋방긋', '톡톡', '반짝반짝', '살랑살랑', '팔랑팔랑', '흔들흔들',
      '깜빡깜빡', '두근두근', '콩콩', '팡팡', '쏙쏙', '히히', '헤헤', '호호',
      '데굴데굴', '폴짝폴짝', '통통통', '쑥쑥', '말랑말랑', '폭신폭신', '보들보들',
      '아옹아옹', '꼬물꼬물', '살금살금', '또각또각', '사뿐사뿐', '아장아장', '총총총',
      // 어미 형태
      '하는이', '되는이', '가는이', '오는이', '보는이', '듣는이', '웃는이',
      '자는이', '달리는이', '걷는이', '뛰는이', '만드는이', '그리는이', '춤추는이'
    ],
    jobs: [
      '개발자', '디자이너', '작가', '화가', '음악가', '요리사', '의사', '선생님', '경찰관', '소방관',
      '간호사', '변호사', '기자', '사진작가', '배우', '가수', '댄서', '운동선수', '과학자', '연구원',
      '건축가', '엔지니어', '파일럿', '승무원', '농부', '어부', '목수', '미용사', '상담사', '통역사',
      '마법사', '탐험가', '항해사', '연금술사', '점술사', '조련사', '발명가', '모험가', '음유시인', '기사',
      '궁수', '대장장이', '약사', '천문학자', '고고학자', '식물학자', '해양학자', '수의사', '조향사', '도예가',
      '제빵사', '바리스타', '소믈리에', '사서', '큐레이터', '안무가', '일러스트레이터', '프로듀서', '감독', '편집자'
    ]
  },
  english: {
    adjectives: [
      // Appearance/State
      'awesome', 'amazing', 'brilliant', 'fantastic', 'incredible', 'wonderful', 'perfect', 'excellent', 'outstanding', 'remarkable',
      'elegant', 'graceful', 'dazzling', 'glowing', 'radiant', 'majestic', 'grand', 'noble', 'fierce', 'mighty',
      // Temperature/Sense
      'cool', 'hot', 'cold', 'warm', 'bright', 'dark', 'light', 'heavy', 'fast', 'slow',
      'strong', 'weak', 'big', 'small', 'huge', 'tiny', 'tall', 'short', 'wide', 'narrow',
      'deep', 'shallow', 'round', 'sharp', 'smooth', 'rough', 'soft', 'hard', 'crisp', 'gentle',
      // Emotion/Personality
      'happy', 'sad', 'angry', 'excited', 'calm', 'peaceful', 'energetic', 'tired', 'fresh', 'bold',
      'brave', 'clever', 'witty', 'kind', 'loyal', 'humble', 'honest', 'patient', 'cheerful', 'jolly',
      'merry', 'cozy', 'snug', 'serene', 'tranquil', 'blissful', 'grateful', 'playful', 'curious', 'eager',
      // Mood/Vibe
      'new', 'young', 'clean', 'wild', 'free', 'silent', 'quiet', 'loud', 'swift', 'nimble',
      'sweet', 'bitter', 'spicy', 'mild', 'mysterious', 'ordinary', 'special', 'weird', 'strange', 'funny',
      'serious', 'magical', 'enchanted', 'cosmic', 'stellar', 'lunar', 'solar', 'crystal', 'velvet', 'misty',
      // Action
      'dancing', 'singing', 'running', 'jumping', 'sleeping', 'dreaming', 'thinking', 'smiling', 'laughing', 'crying',
      'loving', 'caring', 'helping', 'playing', 'working', 'studying', 'reading', 'writing', 'drawing', 'cooking',
      'flying', 'floating', 'drifting', 'wandering', 'gliding', 'spinning', 'tumbling', 'soaring', 'strolling', 'dashing',
      // Color
      'golden', 'silver', 'crimson', 'azure', 'ivory', 'scarlet', 'jade', 'amber', 'coral', 'indigo'
    ],
    nouns: [
      // Animals
      'cat', 'dog', 'rabbit', 'hamster', 'bird', 'fish', 'turtle', 'squirrel', 'fox', 'wolf',
      'lion', 'tiger', 'bear', 'panda', 'elephant', 'giraffe', 'monkey', 'dolphin', 'whale', 'shark',
      'penguin', 'otter', 'butterfly', 'dragonfly', 'ladybug', 'bee', 'firefly', 'owl', 'eagle', 'falcon',
      'crane', 'parrot', 'chameleon', 'jellyfish', 'octopus', 'crab', 'starfish', 'snail', 'koala', 'alpaca',
      'raccoon', 'meerkat', 'cheetah', 'leopard', 'hippo', 'deer', 'hedgehog', 'duck', 'swan', 'sparrow',
      // Nature/Space
      'star', 'moon', 'sun', 'cloud', 'rain', 'snow', 'wind', 'thunder', 'lightning', 'rainbow',
      'flower', 'tree', 'leaf', 'fruit', 'seed', 'forest', 'mountain', 'sky', 'earth', 'fog',
      'dew', 'frost', 'sunset', 'dawn', 'twilight', 'aurora', 'meteor', 'galaxy', 'planet', 'comet',
      // Places
      'ocean', 'river', 'lake', 'island', 'cave', 'road', 'bridge', 'house', 'castle', 'tower',
      'garden', 'meadow', 'prairie', 'valley', 'waterfall', 'cliff', 'beach', 'harbor', 'lighthouse', 'cabin',
      // Objects
      'book', 'pen', 'paper', 'computer', 'phone', 'watch', 'glasses', 'hat', 'shoes', 'bag',
      'mirror', 'candle', 'letter', 'diary', 'map', 'compass', 'telescope', 'balloon', 'kite', 'bell',
      'umbrella', 'key', 'lantern', 'crystal', 'feather', 'ribbon', 'acorn', 'pebble', 'seashell', 'pinecone',
      // Culture/Art
      'music', 'song', 'dance', 'picture', 'photo', 'movie', 'game', 'sport', 'recipe', 'travel',
      'poem', 'novel', 'comic', 'piano', 'guitar', 'drum', 'violin', 'flute', 'brush', 'canvas',
      // Abstract
      'dream', 'hope', 'love', 'friendship', 'peace', 'freedom', 'happiness', 'joy', 'laughter', 'smile',
      'promise', 'secret', 'memory', 'adventure', 'quest', 'miracle', 'gift', 'festival', 'story', 'journey',
      // Food
      'cookie', 'muffin', 'waffle', 'cupcake', 'brownie', 'macaron', 'truffle', 'pudding', 'candy', 'biscuit',
      // Sound/Movement words
      'sparkle', 'twinkle', 'giggle', 'chuckle', 'whisper', 'mumble', 'bubble', 'wiggle', 'jiggle', 'tickle',
      'bounce', 'splash', 'flutter', 'shimmer', 'glimmer', 'buzz', 'hum', 'chirp', 'purr', 'meow',
      'woof', 'tweet', 'crash', 'bang', 'pop', 'snap', 'click', 'beep', 'zoom', 'swirl'
    ],
    jobs: [
      'developer', 'designer', 'writer', 'artist', 'musician', 'chef', 'doctor', 'teacher', 'police', 'firefighter',
      'nurse', 'lawyer', 'journalist', 'photographer', 'actor', 'singer', 'dancer', 'athlete', 'scientist', 'researcher',
      'architect', 'engineer', 'pilot', 'crew', 'farmer', 'fisher', 'carpenter', 'stylist', 'counselor', 'translator',
      'wizard', 'explorer', 'navigator', 'alchemist', 'ranger', 'tamer', 'inventor', 'adventurer', 'bard', 'knight',
      'archer', 'blacksmith', 'pharmacist', 'astronomer', 'botanist', 'librarian', 'curator', 'baker', 'barista', 'potter',
      'brewer', 'sommelier', 'detective', 'guardian', 'healer', 'scribe', 'scholar', 'captain', 'producer', 'director'
    ]
  }
};

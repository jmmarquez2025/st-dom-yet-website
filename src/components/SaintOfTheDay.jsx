import { T } from "../constants/theme";
import { CROSS_FLORY } from "../constants/crossPaths";
import { useTranslation } from "react-i18next";

/**
 * Key feast days keyed by "M/D" (month/day, no leading zeros).
 * Missing dates fall back to a rotating list of Dominican saints.
 */
const FEAST_DAYS = {
  "1/1":  { name: "Mary, Mother of God", feast: "Solemnity", desc: "The Octave of Christmas honors the Theotokos — God-bearer — whose 'yes' opened the door of salvation for all humanity." },
  "1/17": { name: "St. Anthony the Abbot", feast: "Memorial", desc: "Father of monasticism who fled to the Egyptian desert, spending decades in prayer and spiritual combat to draw closer to God." },
  "1/21": { name: "St. Agnes", feast: "Memorial", desc: "A young Roman martyr who chose death over renouncing her faith, one of the most beloved virgin martyrs of the Church." },
  "1/24": { name: "St. Francis de Sales", feast: "Memorial", desc: "Bishop and Doctor of the Church, patron of writers, who taught that holiness is possible in every state of life through gentle love." },
  "1/25": { name: "Conversion of St. Paul", feast: "Feast", desc: "The road to Damascus moment when Saul of Tarsus met the risen Christ and became the greatest apostle to the Gentiles." },
  "1/28": { name: "St. Thomas Aquinas", feast: "Memorial", desc: "Dominican friar and Doctor of the Church. His Summa Theologiae united faith and reason with unparalleled brilliance. Patron of students and universities." },
  "1/31": { name: "St. John Bosco", feast: "Memorial", desc: "Founder of the Salesians and patron of youth, who devoted his life to educating poor young people through kindness and patience." },
  "2/2":  { name: "Presentation of the Lord", feast: "Feast", desc: "Forty days after Christmas, Mary and Joseph presented Jesus in the Temple, where Simeon proclaimed him 'a light for the nations.'" },
  "2/11": { name: "Our Lady of Lourdes", feast: "Optional Memorial", desc: "In 1858, Mary appeared to Bernadette Soubirous in Lourdes, France, saying 'I am the Immaculate Conception.' The shrine draws millions each year." },
  "2/14": { name: "Sts. Cyril and Methodius", feast: "Memorial", desc: "Missionary brothers who brought the Gospel to the Slavic peoples and created an alphabet to translate Scripture into their language." },
  "2/22": { name: "Chair of St. Peter", feast: "Feast", desc: "A feast celebrating the authority Christ gave to Peter — and his successors — to shepherd and teach the universal Church." },
  "3/7":  { name: "Sts. Perpetua and Felicity", feast: "Memorial", desc: "A noblewoman and her slave, both martyred in Carthage in 203 AD. Perpetua's prison diary is among the earliest Christian writings." },
  "3/17": { name: "St. Patrick", feast: "Optional Memorial", desc: "The Apostle of Ireland, who was taken captive as a young man and later returned to evangelize the Irish people with extraordinary zeal." },
  "3/19": { name: "St. Joseph", feast: "Solemnity", desc: "Husband of Mary, foster father of Jesus, patron of the universal Church, workers, and a happy death. 'He who found Jesus has found all treasure.'" },
  "3/25": { name: "Annunciation of the Lord", feast: "Solemnity", desc: "The angel Gabriel appeared to Mary, announcing she would bear the Son of God. Her 'Let it be done' changed the course of history." },
  "4/25": { name: "St. Mark", feast: "Feast", desc: "Evangelist and companion of Peter, whose Gospel — the earliest written — captures Jesus' ministry with vivid urgency and power." },
  "4/29": { name: "St. Catherine of Siena", feast: "Memorial", desc: "Dominican tertiary and Doctor of the Church, patron of Italy and Europe. She confronted popes, cared for the sick, and wrote, 'Be who God meant you to be and you will set the world on fire.'" },
  "5/1":  { name: "St. Joseph the Worker", feast: "Optional Memorial", desc: "A feast honoring Joseph as patron of all who labor, reminding us that daily work done with love participates in God's ongoing creation." },
  "5/26": { name: "St. Philip Neri", feast: "Memorial", desc: "The 'Apostle of Rome,' known for his joyful spirit, humor, and love for souls. He founded the Oratory and transformed Rome through joy." },
  "5/31": { name: "Visitation of the Virgin Mary", feast: "Feast", desc: "Mary visited her cousin Elizabeth carrying the unborn Christ, and at her greeting, John the Baptist leapt for joy in the womb." },
  "6/13": { name: "St. Anthony of Padua", feast: "Memorial", desc: "Franciscan friar and Doctor of the Church, whose preaching moved thousands. Patron of lost things and the poor." },
  "6/24": { name: "Birth of John the Baptist", feast: "Solemnity", desc: "The only saint besides Mary whose birth — not death — is celebrated. John came as voice crying in the wilderness, preparing the way for the Lord." },
  "6/29": { name: "Sts. Peter and Paul", feast: "Solemnity", desc: "The two great pillars of the Church — Peter the Rock and Paul the Apostle to the Nations — both martyred in Rome for the faith." },
  "7/3":  { name: "St. Thomas the Apostle", feast: "Feast", desc: "The 'doubting' apostle whose encounter with the risen Christ produced the greatest act of faith in the Gospels: 'My Lord and my God!'" },
  "7/11": { name: "St. Benedict", feast: "Memorial", desc: "Father of Western monasticism and patron of Europe, whose Rule has shaped monastic life — and Western civilization — for fifteen centuries." },
  "7/22": { name: "St. Mary Magdalene", feast: "Feast", desc: "First witness of the Resurrection, 'Apostle to the Apostles.' She stood at the cross, sat at Jesus' feet, and was first to proclaim 'He is risen!'" },
  "7/25": { name: "St. James", feast: "Feast", desc: "Son of Zebedee and brother of John, the first apostle to be martyred for the faith and patron of pilgrims who journey to Santiago de Compostela." },
  "7/26": { name: "Sts. Joachim and Anne", feast: "Memorial", desc: "The parents of the Virgin Mary, honored for the faithful home in which they raised the woman who would become the Mother of God." },
  "7/31": { name: "St. Ignatius of Loyola", feast: "Memorial", desc: "Founder of the Society of Jesus and author of the Spiritual Exercises, Ignatius sought to 'find God in all things' — and did." },
  "8/4":  { name: "St. John Vianney", feast: "Memorial", desc: "The Curé of Ars, patron of parish priests, who spent up to 16 hours daily in the confessional and drew pilgrims from across Europe." },
  "8/8":  { name: "St. Dominic", feast: "Memorial", desc: "Founder of the Order of Preachers. Dominic united contemplation and action, prayer and study, in a life devoted entirely to preaching truth and saving souls. Our patron." },
  "8/10": { name: "St. Lawrence", feast: "Feast", desc: "A deacon of Rome martyred in 258 AD, who told his torturers to turn him over as he was done on one side. His charity to the poor is a model for all." },
  "8/11": { name: "St. Clare", feast: "Memorial", desc: "Friend of St. Francis and founder of the Poor Clares, Clare embraced radical poverty as her path to God, becoming a mirror of the Gospel." },
  "8/14": { name: "St. Maximilian Kolbe", feast: "Memorial", desc: "Franciscan priest who voluntarily took the place of a condemned family man in Auschwitz's starvation bunker. Martyred August 14, 1941." },
  "8/15": { name: "Assumption of the Virgin Mary", feast: "Solemnity", desc: "Mary, having completed her earthly life, was taken body and soul into heavenly glory — the first to share fully in her Son's resurrection." },
  "8/20": { name: "St. Bernard of Clairvaux", feast: "Memorial", desc: "Cistercian abbot and Doctor of the Church whose mystical writings on divine love shaped medieval Christianity and Marian devotion." },
  "8/24": { name: "St. Bartholomew", feast: "Feast", desc: "One of the Twelve Apostles, who tradition says carried the Gospel to India and Armenia and was martyred by being flayed alive." },
  "8/27": { name: "St. Monica", feast: "Memorial", desc: "The mother of St. Augustine, whose decades of prayer and tears obtained her wayward son's conversion. Patron of mothers and of those with difficult families." },
  "8/28": { name: "St. Augustine", feast: "Memorial", desc: "Bishop of Hippo and Doctor of Grace, one of Christianity's greatest minds. 'Our heart is restless, O Lord, until it rests in Thee.'" },
  "9/3":  { name: "St. Gregory the Great", feast: "Memorial", desc: "Pope, Doctor of the Church, and reformer who sent Augustine to England, gave us Gregorian chant, and called himself 'servant of the servants of God.'" },
  "9/8":  { name: "Birth of the Virgin Mary", feast: "Feast", desc: "The birthday of Mary, who was prepared from conception to be the Mother of God. The Church rejoices in her birth as dawn before the rising of the Sun." },
  "9/13": { name: "St. John Chrysostom", feast: "Memorial", desc: "Archbishop of Constantinople and Doctor of the Church, the greatest preacher of antiquity. His name means 'golden-mouthed.'" },
  "9/14": { name: "Exaltation of the Holy Cross", feast: "Feast", desc: "A feast honoring the Cross as the instrument of salvation — the wood that bore the fruit of eternal life." },
  "9/15": { name: "Our Lady of Sorrows", feast: "Memorial", desc: "Mary's seven sorrows, culminating at Calvary, reveal a mother's love and her compassion with the suffering Christ." },
  "9/21": { name: "St. Matthew", feast: "Feast", desc: "Tax collector turned apostle and evangelist, Matthew's Gospel proclaims Jesus as the fulfilment of all the Law and the Prophets." },
  "9/27": { name: "St. Vincent de Paul", feast: "Memorial", desc: "Patron of all charitable works, Vincent organized care for the poor and founded institutions of mercy whose spirit continues worldwide." },
  "9/29": { name: "Sts. Michael, Gabriel, and Raphael", feast: "Feast", desc: "The three archangels — Michael the warrior, Gabriel the messenger, Raphael the healer — honored as God's heavenly messengers." },
  "9/30": { name: "St. Jerome", feast: "Memorial", desc: "Doctor of the Church and translator of the Latin Bible (the Vulgate), Jerome's lifelong dedication to Scripture was fierce and fruitful." },
  "10/1": { name: "St. Thérèse of Lisieux", feast: "Memorial", desc: "The Little Flower and Doctor of the Church. Her 'Little Way' showed that ordinary love lived with extraordinary fidelity is the path to holiness." },
  "10/2": { name: "Guardian Angels", feast: "Memorial", desc: "The Church gives thanks for the angels God assigns to each soul to protect and guide us on our journey to heaven." },
  "10/4": { name: "St. Francis of Assisi", feast: "Memorial", desc: "Patron of Italy, ecology, and animals, Francis embraced radical poverty and bore the wounds of Christ in his own body. His joy was contagious." },
  "10/7": { name: "Our Lady of the Rosary", feast: "Memorial", desc: "Instituted to give thanks for the 1571 victory at Lepanto, this feast honors Mary and the rosary prayer the Dominican Order has promoted for centuries." },
  "10/15": { name: "St. Teresa of Avila", feast: "Memorial", desc: "First female Doctor of the Church and reformer of Carmel, whose Interior Castle maps the soul's journey through seven mansions to union with God." },
  "10/18": { name: "St. Luke", feast: "Feast", desc: "Physician, evangelist, and companion of Paul. Luke's Gospel portrays the compassionate Christ, and Acts records the birth of the Church." },
  "10/28": { name: "Sts. Simon and Jude", feast: "Feast", desc: "Two apostles joined in the same feast — Simon the Zealot and Jude Thaddaeus, patron of hopeless causes and desperate situations." },
  "11/1": { name: "All Saints", feast: "Solemnity", desc: "The Church triumphant — canonized and unknown alike — all who now behold the face of God and intercede for those still on the way." },
  "11/2": { name: "All Souls", feast: "Commemoration", desc: "All the faithful departed are remembered today. The Church prays that God's mercy may bring every soul to the light that has no evening." },
  "11/4": { name: "St. Charles Borromeo", feast: "Memorial", desc: "Cardinal-Archbishop of Milan who implemented the Council of Trent with care and thoroughness. Patron of catechists, seminarians, and bishops." },
  "11/11": { name: "St. Martin of Tours", feast: "Memorial", desc: "A Roman soldier who cut his cloak to clothe a beggar — and that night dreamed it was Christ who wore the half he gave away." },
  "11/17": { name: "St. Elizabeth of Hungary", feast: "Memorial", desc: "A queen who gave up her crown to serve the poor, and a Dominican tertiary. Her life shows that royal dignity is perfected in humble charity." },
  "11/22": { name: "St. Cecilia", feast: "Memorial", desc: "Patron of musicians and sacred music, Cecilia was a Roman noblewoman who sang to God in her heart even on her wedding day." },
  "11/30": { name: "St. Andrew", feast: "Feast", desc: "Brother of Peter and the first called by Christ, Andrew is patron of Scotland, Russia, and Greece. He brought others to meet the Lord." },
  "12/3":  { name: "St. Francis Xavier", feast: "Memorial", desc: "Jesuit missionary who carried the Gospel across India and Japan, baptizing hundreds of thousands before dying alone on the way to China." },
  "12/6":  { name: "St. Nicholas", feast: "Optional Memorial", desc: "Bishop of Myra whose extraordinary secret generosity became the foundation of the Christmas gift-giving tradition beloved throughout the world." },
  "12/7":  { name: "St. Ambrose", feast: "Memorial", desc: "Bishop of Milan, Doctor of the Church, and mentor of Augustine. Ambrose stood before emperors and shaped the theology of Church and State." },
  "12/8":  { name: "Immaculate Conception", feast: "Solemnity", desc: "Mary was preserved from original sin from the very first moment of her existence, prepared by God's grace to bear his Son." },
  "12/12": { name: "Our Lady of Guadalupe", feast: "Feast", desc: "Mary appeared to St. Juan Diego in 1531, leaving her miraculous image on his tilma. She remains the most-visited Marian shrine in the world." },
  "12/13": { name: "St. Lucy", feast: "Memorial", desc: "A Sicilian martyr whose name means 'light,' Lucy gave her dowry to the poor and gave her life rather than betray her faith." },
  "12/14": { name: "St. John of the Cross", feast: "Memorial", desc: "Co-founder of the Discalced Carmelites and Doctor of the Church, John mapped the soul's dark night as the path to mystical union with God." },
  "12/26": { name: "St. Stephen", feast: "Feast", desc: "The first Christian martyr, stoned to death while he saw heaven open and prayed for his persecutors — perfectly mirroring Christ on the cross." },
  "12/27": { name: "St. John the Apostle", feast: "Feast", desc: "The beloved disciple, theologian of love, and author of the Fourth Gospel. 'God is love, and whoever abides in love abides in God.' (1 Jn 4:16)" },
  "12/28": { name: "Holy Innocents", feast: "Feast", desc: "The children massacred by Herod in his search for the infant Christ — the first to die for Jesus, though they could not yet speak his name." },
};

// Rotating Dominican saints for days without a named feast
const DOMINICAN_SAINTS = [
  { name: "St. Dominic", desc: "Founder of the Order of Preachers, whose life of prayer, study, and preaching continues in the Dominican charism at this church." },
  { name: "St. Thomas Aquinas", desc: "The Angelic Doctor, who showed that the love of truth is itself a form of divine love." },
  { name: "St. Catherine of Siena", desc: "Doctor of the Church who called the Church back to holiness through love and truth." },
  { name: "St. Martin de Porres", desc: "Dominican lay brother who cared for the sick and poor of Lima, Peru. Patron of social justice." },
  { name: "St. Rose of Lima", desc: "First canonized saint of the Americas and Dominican tertiary, whose sufferings were a hidden fragrance offered to God." },
  { name: "Bl. Margaret of Castello", desc: "Dominican tertiary who was abandoned by her family yet found her home in God and among the poor." },
  { name: "St. Pius V", feast: "Pope", desc: "Dominican friar who became pope, reformed the Mass after Trent, and gave us the Feast of Our Lady of the Rosary." },
];

function getSaint() {
  const now = new Date();
  const key = `${now.getMonth() + 1}/${now.getDate()}`;
  if (FEAST_DAYS[key]) return { ...FEAST_DAYS[key], isFeast: true };

  // Rotate through Dominican saints for uncovered days
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const fallback = DOMINICAN_SAINTS[dayOfYear % DOMINICAN_SAINTS.length];
  return { ...fallback, feast: "Dominican Charism", isFeast: false };
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function SaintOfTheDay() {
  const { t } = useTranslation();
  const saint = getSaint();
  const dateStr = getFormattedDate();

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${T.burgundyDark} 0%, ${T.burgundy} 100%)`,
        borderRadius: 12,
        padding: "clamp(32px, 5vw, 48px)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      {/* Ornamental Dominican Cross Flory watermark (arc-based Wikimedia path) */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", right: -10, top: -10, opacity: 0.06, width: 220, height: 220 }}
        viewBox={CROSS_FLORY.viewBox}
        fill="#fff"
      >
        <path d={CROSS_FLORY.d} />
      </svg>

      {/* Date pill */}
      <div
        style={{
          display: "inline-block",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: T.goldLight,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {dateStr}
      </div>

      {/* Eyebrow */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {t("saintOfDay.label")}
      </div>

      {/* Saint name */}
      <h2
        style={{
          fontSize: "clamp(26px, 4vw, 38px)",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#fff",
          marginBottom: 8,
        }}
      >
        {saint.name}
      </h2>

      {/* Feast type badge */}
      <div
        style={{
          display: "inline-block",
          padding: "4px 14px",
          background: "rgba(255,255,255,0.12)",
          borderRadius: 20,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: T.goldLight,
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        {saint.feast}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.82)",
        }}
      >
        {saint.desc}
      </p>
    </div>
  );
}

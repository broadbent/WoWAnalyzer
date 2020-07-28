import SPELLS from 'common/SPELLS';
import CoreSelfHealing from 'parser/shared/modules/SelfHealing';

class SelfHealing extends CoreSelfHealing {
  static TARGETED_HEALING_ABILITIES = [
    SPELLS.REGROWTH.id,
    SPELLS.REJUVENATION.id,
    SPELLS.SWIFTMEND.id,
    SPELLS.LIFEBLOOM_HOT_HEAL.id,
    SPELLS.LIFEBLOOM_BLOOM_HEAL.id, //Photosynthesis talent?
    SPELLS.CENARION_WARD_HEAL.id,
    SPELLS.RENEWAL_TALENT,
  ];

}

export default SelfHealing;

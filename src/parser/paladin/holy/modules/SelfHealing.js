import SPELLS from 'common/SPELLS';
import CoreSelfHealing from 'parser/shared/modules/SelfHealing';

class SelfHealing extends CoreSelfHealing {
  static TARGETED_HEALING_ABILITIES = [
    SPELLS.HOLY_SHOCK_HEAL.id,
    SPELLS.HOLY_LIGHT.id,
    SPELLS.FLASH_OF_LIGHT.id,
    SPELLS.BESTOW_FAITH_TALENT.id,
  ];

}

export default SelfHealing;

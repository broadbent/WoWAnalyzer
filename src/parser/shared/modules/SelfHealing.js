import { formatPercentage } from 'common/format';
import Analyzer from 'parser/core/Analyzer';

import Abilities from '../../core/modules/Abilities';

class SelfHealing extends Analyzer {
  static dependencies = {
    abilities: Abilities,
  };

  static TARGETED_HEALING_ABILITIES = [
    // Extend this class and override this property in your spec class to implement this module.
  ];
  
  totalHealing = 0;
  selfHealing = 0;
  get selfHealingPercentage() {
    return this.selfHealing / this.totalHealing;
  }

  getAbility(spellId, abilityInfo = null) {
    let ability = this.abilities[spellId];
    if (!ability) {
      ability = {
        ability: abilityInfo,
      };
      this.abilities[spellId] = ability;
    }
    if (!ability.ability && abilityInfo) {
      ability.ability = abilityInfo;
    }
    return ability;
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    const cast = this.getAbility(spellId, event.ability);
    const healing = (cast.healingEffective || 0) + (event.amount || 0);
    
    this.totalHealing += healing;
    if (this.countsAsTargetedHealingAbility(spellId) && this.countsAsSelfHeal(event) && this.aboveSafeHitpointThreshold(event)) {
      this.selfHealing += healing;
    }
  }

  countsAsTargetedHealingAbility(spellId) {
    return (this.constructor.TARGETED_HEALING_ABILITIES.includes(spellId));
  }

  countsAsSelfHeal(event){
    return (event.sourceID === event.targetID);
  }

  aboveSafeHitpointThreshold(event){
    return ((event.hitPoints/event.maxHitPoints)>=0.1);
  }

  get selfHealingSuggestionThresholds() {
    return {
      actual: this.selfHealingPercentage,
      isGreaterThan: {
        minor: 0.1,
        average: 0.2,
        major: 0.3,
      },
      style: 'percentage',
    };
  }
  suggestions(when) {
    when(this.selfHealingSuggestionThresholds.actual).isGreaterThan(this.selfHealingSuggestionThresholds.isGreaterThan.minor)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest('Your self healing can be improved. Try to minimise the amount you are intentionally healing yourself whilst above 10% health.')
          .icon('petbattle_health')
          .actual(`${formatPercentage(actual)}% self healing`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(this.selfHealingSuggestionThresholds.isGreaterThan.average).major(this.selfHealingSuggestionThresholds.isGreaterThan.major);
      });
  }
}

export default SelfHealing;

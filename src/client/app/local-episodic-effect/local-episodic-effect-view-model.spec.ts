import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
export function main() {
  let localEpisodicEffectViewModel: LocalEpisodicEffectViewModel;

  describe('Local Episodic Effects View Model', () => {

    beforeEach(() => {
      localEpisodicEffectViewModel = new LocalEpisodicEffectViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(localEpisodicEffectViewModel).toBeDefined();

      expect(localEpisodicEffectViewModel.event).toEqual('');

      let nowPart: string = MiscUtils.getPresentDateTime().replace(/T.*/,'');
      expect(localEpisodicEffectViewModel.startDate).toBeDefined();
      expect(localEpisodicEffectViewModel.startDate).toContain(nowPart);
      expect(localEpisodicEffectViewModel.endDate).toEqual('');
    });
  });
}

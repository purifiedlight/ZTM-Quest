import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const mushroomsDialogue = [
    "The mushrooms have a deep purple hue, their smooth caps almost glistening in the soft light. The dark tan roots twist and burrow into the earth beneath them. There's something otherworldly about their appearance—beautiful, yet slightly unsettling. A faint, sweet smell rises from the caps, mixing with the earthy scent of the forest floor.",
];

export const interactionWithMushroom = (player, k, map) => {
    interactionHandler(player, 'mushrooms', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'mushrooms',
            text: mushroomsDialogue,
        });
    });
};

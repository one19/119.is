import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const MaskedContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  height: 2em;
  margin-bottom: 2em;
  /* CSS mask for a smooth fade from transparent to white to transparent */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 15%,
    white 50%,
    transparent 85%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 15%,
    white 50%,
    transparent 85%
  );
`;

const List = styled.div<{ translateY: number }>`
  transition: transform 2s ease-out;
  transform: translateY(-${(props) => props.translateY}px);
`;

const ListItem = styled.div`
  height: 2em;
  line-height: 2em;
  color: white;
`;

const descriptors = [
  'Moron',
  'Nincompoop',
  'Soggy palimpsest',
  'Fundamentally broken semi-functional human',
  'Experienced',
  'Ex rocket scientist',
  'Thief',
  'Below average',
  'Average',
  'Above average',
  'Thunker',
  'Swammer',
  'Space cadet',
  "Chalcedony's bane",
  'Semi-competent',
  'Mostly-literate',
  'Well-read (in scifi/fantasy)',
  'Trying to be funny',
  'Sometimes autodidact',
  'Awed by many things',
  'Never released a game',
  'Now with less fat!',
  'Not a cat',
  'Lover of design',
  'Has seen too many movies',
  'Css (in JS) artisan',
  'Recovering perfectionist',
  'Has shipped things',
  'Webpack survivor',
  'Gulp survivor',
  'Grunt survivor',
  'Coffee-fueled',
  'Has written TS without errors',
  'Thinks whitespace should not have semantic meaning',
  'CI/CD apologist',
  'The typhoid Mary of gitmoji',
  'Terminal enjoyer',
  'Terminally online',
  'Procrastinated this message',
  'Lover of semicolons',
  'Types strictly, thinks loosely',
  'git add -p / git commit --amend / :wq',
  'Async awaiter',
  'Regularly misunderstands documentation',
  'Prefers dark mode IRL',
  'Compulsive npm updater',
  "Strongly holds the opinion that you shouldn't hold strong opinions",
  'Three.js card-shuffling specialist',
  'Functionally impure',
  'Ratbag board gamer',
  'Never learned Dvorak',
  'Unironically loves JS',
  'Has forgotten the old ways',
];

const DescriptorRoller = () => {
  // Assume an item height of 32 pixels (approx. 2em at 16px font size)
  const itemHeight = 32;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const rollToNewIndex = () => {
    let newIndex = selectedIndex;
    while (newIndex === selectedIndex) {
      newIndex = Math.floor(Math.random() * descriptors.length);
    }
    setAnimate(false);
    // Brief timeout to reset animation state before applying new translation
    setTimeout(() => {
      setSelectedIndex(newIndex);
      setAnimate(true);
    }, 100);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * descriptors.length);
    setSelectedIndex(randomIndex);
    // Trigger the roll animation after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MaskedContainer onClick={rollToNewIndex}>
      <List translateY={animate ? selectedIndex * itemHeight : 0}>
        {descriptors.map((desc, index) => (
          <ListItem key={index}>{desc}</ListItem>
        ))}
      </List>
    </MaskedContainer>
  );
};

export default DescriptorRoller;

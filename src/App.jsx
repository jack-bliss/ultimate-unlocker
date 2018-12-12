import React, { Component, Fragment } from 'react';
import Portrait from './components/Portrait';
import Column from './components/Column';
import Spacer from './components/Spacer';
import Classic from './data/classic.json';
import Versus from './data/versus.json';
import { withCookies } from 'react-cookie';

const StartingCharacters = Object.keys(Classic);

class App extends Component {

  constructor(props) {
    super(props);
    const {cookies} = this.props;
    const unlocked = cookies.get('unlocked') || [];
    const missed = cookies.get('missed') || [];
    this.state = {
      hovering: null,
      unlocked,
      missed
    }
  }

  setHovering = (hovering) => {
    this.setState({hovering});
  }

  cycleState = (character) => {
    const {unlocked, missed} = this.state;
    if (unlocked.includes(character)) {
      this.removeFromUnlocks(character);
      this.addToMissed(character);
      return;
    }
    if (missed.includes(character)) {
      this.removeFromMissed(character);
      return;
    }
    this.addToUnlocks(character);
    return;
  }

  addToUnlocks = (character) => {
    const {unlocked: already_unlocked} = this.state;
    const {cookies} = this.props;
    const unlocked = [...already_unlocked, character];
    cookies.set('unlocked', unlocked);
    this.setState({unlocked});
  }

  removeFromUnlocks = (character) => {
    const {unlocked: already_unlocked} = this.state;
    const {cookies} = this.props;
    const unlocked = already_unlocked.filter(existing => existing !== character);
    cookies.set('unlocked', unlocked);
    this.setState({unlocked});
    return;
  }

  addToMissed = (character) => {
    const {missed: previously_missed} = this.state;
    const {cookies} = this.props;
    const missed = [...previously_missed, character];
    cookies.set('missed', missed);
    this.setState({missed});
  }

  removeFromMissed = (character) => {
    const {missed: previously_missed} = this.state;
    const {cookies} = this.props;
    const missed = previously_missed.filter(existing => existing !== character);
    cookies.set('missed', missed);
    this.setState({missed});
  }

  getCharacterState = (character) => {
    const {unlocked, missed} = this.state;
    if (unlocked.includes(character)) {
      return 'unlocked';
    }
    if (missed.includes(character)) {
      return 'missed';
    }
    return 'locked';
  }

  getNextVsCharacter = (range) => {
    const {missed, unlocked} = this.state;
    const upcoming = Versus.filter((character) => {
      return (
        !missed.includes(character)
        && !unlocked.includes(character)
      )
    });
    return upcoming.slice(0, range);
  }

  render() {
    const {hovering} = this.state;
    const upcoming = this.getNextVsCharacter(9);
    return (
      <Fragment>
        {StartingCharacters.map((title_character) => {
          return (
            <Column key={`title_${title_character}`}>
              <Portrait character={title_character} unlocked={false} />
              <Spacer />
              {Classic[title_character].map((character) => {
                return (
                  <Portrait 
                    key={`${title_character}_${character}`} 
                    character={character} 
                    state={this.getCharacterState(character)} 
                    hovering={hovering === character}
                    onMouseMove={() => this.setHovering(character)}
                    onClick={() => this.cycleState(character)}
                  />
                )
              })}
            </Column>
          );
        })}

        <Column>
          <h2>VS:</h2>
          {upcoming.map((upcomingCharacter, i) => {
            return (
              <Portrait
                key={`${upcomingCharacter}_uc_${i}`}
                character={upcomingCharacter}
                state={this.getCharacterState(upcomingCharacter)}
                hovering={hovering === upcomingCharacter}
                onMouseMove={() => this.setHovering(upcomingCharacter)}
                onClick={() => this.cycleState(upcomingCharacter)}
              ></Portrait>
            )
          })}
        </Column>
      </Fragment>
    );
  }
}

export default withCookies(App);

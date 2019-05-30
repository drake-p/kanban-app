import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }

  create(lane) {
    lane.notes = lane.notes || [];

    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }

  update(updatedLane) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === updatedLane.id) {
          return Object.assign({}, lane, updatedLane);
        }

        return lane;
      })
    });
  }

  delete(laneId) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== laneId)
    });
  }

  attachToLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map((lane) => {
        if(lane.notes.includes(noteId)) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }

        if(lane.id === laneId) {
          lane.notes = lane.notes.concat([noteId]);
        }

        return lane;
      })
    });
  }

  detachFromLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map((lane) => {
        if(lane.id === laneId) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }

        return lane;
      })
    });
  }

  /* so this function has some issues.
   * i think it'd be cool to implement a more intuitive dragndrop, i.e.
   * where hovering over the top half of the target will insert the source above,
   * and hovering over the bottom half of the target will insert below.
   * that would involve altering the noteTarget function in ways i'm not 100% confident
   * about yet, but could be a fun exercise.
   * 'twould eliminate the weird case where we pass targetId = 0 to insert @ top of list.
   */
  move({sourceId, targetId}) {
    const lanes = this.lanes;

    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0]; // undef if targetId === 0

    // targetId of 0 means we're just moving an item to the top of its list.
    // the tutorial does not consider this case but it was driving me crazy.
    if (targetId === 0) {
      sourceLane.notes.splice(sourceLane.notes.indexOf(sourceId), 1);
      sourceLane.notes.unshift(sourceId);

    } else {

      // okay the tutorial tells us to use yet another package for this but i feel like
      // that's just an excuse to make us learn that package bc this works fine?
      // like they want to use splice and that's neat and short but if you don't rely
      // on index you don't have to import another entire package.
      // i mean if you're already using the package elsewhere i guess it's nbd but i just
      // i don't wanna.

      // so here we rebuild the source lane's notes array without the source note
      sourceLane.notes = sourceLane.notes.reduce((reordered, noteId) => (
        (noteId !== sourceId) ? reordered.concat([noteId]) : reordered
      ), []);

      // and here we rebuild the target lane's notes array with the source note following the target note
      targetLane.notes = targetLane.notes.reduce((reordered, noteId) => (
        (noteId === targetId) ? reordered.concat([noteId, sourceId]) : reordered.concat([noteId])
      ), []);
    }

    // also fun fact if you omit this.setState() the thing runs anyway. i think it's an object
    // pointer situation that updates the lanes prop, but i'm not sure why the app would re-render without setState
    this.setState({lanes});
  }
}

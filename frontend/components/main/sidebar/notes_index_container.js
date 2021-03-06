import { connect } from 'react-redux';
import { getNotes } from '../../../reducers/selectors';
import { fetchNotes } from '../../../actions/notes/notes_actions';
import { removeTagFilter } from '../../../actions/tags/tag_filter_actions';
import Sidebar from './notes_index';

const mapStateToProps = state => {
    const search = state.ui.search;
    const header = search ? `${search}` : "All Notes";

    return ({
    notes: getNotes(state),
    search,
    header,
    tagFilter: state.entities.tags[state.ui.tagFilters],
    editorExpand: state.ui.editorUI
    })
};

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    removeTagFilter: (tagId) => dispatch(removeTagFilter(tagId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

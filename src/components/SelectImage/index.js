import React from 'react';

class SelectImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: ""};
      }

      handleChange = event => {
        console.log(event.target.value);
        this.setState({select: event.target.value});
        var	handleToUpdate	=	this.props.onSelected;
        handleToUpdate(event.target.value);
      };

      render() {
        const options = [
            {value: '', text: '--Choose an option--'},
            {value: 'logo_bdx_io', text: 'Bdx io'},
            {value: 'CdiscountSite', text: 'Cdiscount website'},
            {value: 'CdiscountLogo', text: 'Cdiscount logo'},
            {value: 'banana', text: 'Banana 🍌'},
            {value: 'kiwi', text: 'Kiwi 🥝'},
          ];

          const {selected} = this.state;
          const handleChange = this.handleChange;
        return (
            <div>
            <select value={selected} onChange={handleChange.bind(this)}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        );
    }
}

export default SelectImage;
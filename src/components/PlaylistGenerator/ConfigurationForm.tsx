import React, { useState, useEffect, useCallback, EventHandler, SyntheticEvent } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-size: 16px;
`;

const FormSet = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

const Checkbox = styled.input`
    transform: translate(-50px, 20px);
`

const Input = styled.input`
    margin: 5px 0 15px 0;
    font-size: 18px;
`;

const Button = styled.button`
    margin-top: 15px;
    font-size: 18px;
`;


interface ChildComponentProps {
    onSubmitForm: ({ }: PlaylistFormData) => void;
}

export interface PlaylistFormData {
    playlistName: string;
    startYear?: number;
    endYear?: number;
    startBpm?: number;
    endBpm?: number;
    danceability?: number;
    numberOfTracks: number;
}

const ConfigurationForm: React.FC<ChildComponentProps> = ({ onSubmitForm }) => {
    const [numberOfTracks, setNumberOfTracks] = useState(1000);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [yearToggle, setYearToggle] = useState(false);
    const [startYear, setStartYear] = useState(1960);
    const [endYear, setEndYear] = useState(2020);
    const [bpmToggle, setBpmToggle] = useState(false);
    const [startBpm, setStartBpm] = useState(80);
    const [endBpm, setEndBpm] = useState(120);
    const [danceabilityToggle, setDanceabilityToggle] = useState(false);
    const [danceability, setDanceability] = useState(0.5);

    const onPlaylistNameInput = useCallback(({ target }) => {
        setPlaylistName(target.value);
    }, []);

    const onStartBpmInput = useCallback(({ target }) => {
        setStartBpm(target.value);
    }, []);

    const onEndBpmInput = useCallback(({ target }) => {
        setEndBpm(target.value);
    }, []);

    const onStartYearInput = useCallback(({ target }) => {
        setStartYear(target.value);
    }, []);

    const onEndYearInput = useCallback(({ target }) => {
        setEndYear(target.value);
    }, []);

    const onNumberInput = useCallback(({ target }) => {
        setNumberOfTracks(target.value);
    }, []);

    const onDanceabilityInput = useCallback(({ target }) => {
        setDanceability(target.value);
    }, []);

    const onBpmToggle = useCallback(({ target }) => {
        setBpmToggle(target.checked);
    }, []);

    const onYearToggle = useCallback(({ target }) => {
        setYearToggle(target.checked);
    }, []);
    
    const onDanceabilityToggle = useCallback(({ target }) => {
        setDanceabilityToggle(target.checked);
    }, []);

    const onButtonClick = () => {
        onSubmitForm({
            playlistName,
            startBpm: bpmToggle ? startBpm : undefined,
            endBpm: bpmToggle ? endBpm : undefined,
            startYear: yearToggle ? startYear : undefined,
            endYear: yearToggle ? endYear : undefined,
            numberOfTracks,
            danceability: danceabilityToggle ? danceability / 100 : undefined,
        })
    }

    return (
        <React.Fragment>
            <FormSet>
                <Label htmlFor="playlistName">Name of playlist</Label>
                <Input name="playlistName" type="text" value={playlistName} onChange={onPlaylistNameInput}></Input>
            </FormSet>
            <FormSet>
                <Label htmlFor="numberOfTemplateTracks">Number of template tracks</Label>
                <Input name="numberOfTemplateTracks" type="number" value={numberOfTracks} onChange={onNumberInput}></Input>
            </FormSet>
            <FormSet className={bpmToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={bpmToggle} onChange={onBpmToggle}></Checkbox>
                <Label htmlFor="startBpm">BPM Range Start</Label>
                <Input disabled={!bpmToggle} name="startBpm" type="number" value={startBpm} onChange={onStartBpmInput}></Input>
                <Label htmlFor="endBpm">BPM Range End</Label>
                <Input disabled={!bpmToggle} name="endBpm" type="number" value={endBpm} onChange={onEndBpmInput}></Input>
            </FormSet>
            <FormSet className={yearToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={yearToggle} onChange={onYearToggle}></Checkbox>
                <Label htmlFor="startYear">Release period (start year)</Label>
                <Input disabled={!yearToggle} name="startYear" type="number" value={startYear} onChange={onStartYearInput}></Input>
                <Label htmlFor="endYear">Release period (end year)</Label>
                <Input disabled={!yearToggle} name="endYear" type="number" value={endYear} onChange={onEndYearInput}></Input>
            </FormSet>
            <FormSet className={danceabilityToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={danceabilityToggle} onChange={onDanceabilityToggle}></Checkbox>
                <Label htmlFor="danceability">Danceability</Label>
                <Input disabled={!danceabilityToggle} name="danceability" type="range" value={danceability} onChange={onDanceabilityInput}></Input>
            </FormSet>
            <Button onClick={onButtonClick}>Create Playlist</Button>
        </React.Fragment>
    )
}

export default ConfigurationForm;
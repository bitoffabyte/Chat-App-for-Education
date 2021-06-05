import './Video.css';

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { useUserContext } from '../../Context/UserContext';

const Video = (props) => {
	const ref = useRef();

	useEffect(() => {
		props.peer.on('stream', (stream) => {
			ref.current.srcObject = stream;
			console.log(stream);
		});
	}, []);

	return <video className='vidbod' playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
	height: window.innerHeight / 2,
	width: window.innerWidth / 2,
};

const Room = (props) => {
	const [peers, setPeers] = useState([]);
	// const socketRef = useRef();
	const userVideo = useRef();
	const peersRef = useRef([]);
	const roomID = props.id;
	const { socketRef } = useUserContext();
	useEffect(() => {
		// socketRef.current = io.connect('/');
		navigator.mediaDevices
			.getUserMedia({ video: videoConstraints, audio: true })
			.then((stream) => {
				userVideo.current.srcObject = stream;
				socketRef.current.emit('join room', roomID);
				socketRef.current.on('all users', (users) => {
					const peers = [];
					users.forEach((userID) => {
						const peer = createPeer(
							userID,
							socketRef.current.id,
							stream
						);
						peersRef.current.push({
							peerID: userID,
							peer,
						});
						peers.push(peer);
					});
					setPeers(peers);
				});

				socketRef.current.on('user joined', (payload) => {
					const peer = addPeer(
						payload.signal,
						payload.callerID,
						stream
					);
					peersRef.current.push({
						peerID: payload.callerID,
						peer,
					});

					setPeers((users) => [...users, peer]);
				});

				socketRef.current.on(
					'receiving returned signal',
					async (payload) => {
						try {
							const item = peersRef.current.find(
								(p) => p.peerID === payload.id
							);
							item.peer.signal(payload.signal);
						} catch (err) {}
					}
				);
			});
		return () => {
			socketRef.current.emit('disconnect');
		};
	}, []);

	function createPeer(userToSignal, callerID, stream) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream,
		});

		peer.on('signal', (signal) => {
			socketRef.current.emit('sending signal', {
				userToSignal,
				callerID,
				signal,
			});
		});

		return peer;
	}

	function addPeer(incomingSignal, callerID, stream) {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream,
		});

		peer.on('signal', (signal) => {
			socketRef.current.emit('returning signal', { signal, callerID });
		});

		peer.signal(incomingSignal);

		return peer;
	}

	return (
		<div className='videoContainer'>
			<video
				className='vidbod'
				muted
				ref={userVideo}
				autoPlay
				playsInline
			/>{' '}
			{peers.map((peer, index) => {
				return <Video key={index} peer={peer} />;
			})}
		</div>
	);
};

export default Room;

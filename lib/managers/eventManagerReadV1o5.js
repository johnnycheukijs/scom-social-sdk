"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NostrEventManagerReadV1o5 = void 0;
const index_1 = require("../core/index");
const utilsManager_1 = require("./utilsManager");
class NostrEventManagerReadV1o5 {
    constructor(manager) {
        this._nostrCommunicationManager = manager;
    }
    set nostrCommunicationManager(manager) {
        this._nostrCommunicationManager = manager;
    }
    set privateKey(privateKey) {
        this._privateKey = privateKey;
    }
    augmentWithAuthInfo(obj) {
        return utilsManager_1.SocialUtilsManager.augmentWithAuthInfo(obj, this._privateKey);
    }
    async fetchThreadCacheEvents(id, pubKey) {
        let decodedId = id.startsWith('note1') ? index_1.Nip19.decode(id).data : id;
        let msg = this.augmentWithAuthInfo({
            eventId: decodedId,
            limit: 100
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-thread-posts', msg);
        return fetchEventsResponse.events;
    }
    async fetchTrendingCacheEvents(pubKey) {
        let msg = {};
        if (pubKey) {
            const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
            msg.user_pubkey = decodedPubKey;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchCachedEvents('explore_global_trending_24h', msg);
        return fetchEventsResponse.events;
    }
    async fetchProfileFeedCacheEvents(userPubkey, pubKey, since = 0, until = 0) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            limit: 20,
            pubkey: decodedPubKey
        });
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        if (userPubkey) {
            const decodedUserPubKey = userPubkey.startsWith('npub1') ? index_1.Nip19.decode(userPubkey).data : userPubkey;
            msg.user_pubkey = decodedUserPubKey;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-profile-feed', msg);
        return fetchEventsResponse.events;
    }
    async fetchProfileRepliesCacheEvents(userPubkey, pubKey, since = 0, until = 0) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            limit: 20,
            pubkey: decodedPubKey
        });
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        if (userPubkey) {
            const decodedUserPubKey = userPubkey.startsWith('npub1') ? index_1.Nip19.decode(userPubkey).data : userPubkey;
            msg.user_pubkey = decodedUserPubKey;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-profile-replies', msg);
        return fetchEventsResponse.events;
    }
    async fetchHomeFeedCacheEvents(pubKey, since = 0, until = 0) {
        let msg = {
            limit: 20
        };
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        msg.pubkey = index_1.Nip19.decode('npub1nfgqmnxqsjsnsvc2r5djhcx4ap3egcjryhf9ppxnajskfel2dx9qq6mnsp').data;
        if (pubKey) {
            const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
            msg.user_pubkey = decodedPubKey;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchCachedEvents('feed', msg);
        return fetchEventsResponse.events;
    }
    async fetchUserProfileCacheEvents(pubKeys) {
        const decodedPubKeys = pubKeys.map(pubKey => pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey);
        let msg = this.augmentWithAuthInfo({
            pubkeys: decodedPubKeys
        });
        console.log('fetchUserProfileCacheEvents', msg);
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-profiles', msg);
        return fetchEventsResponse.events;
    }
    async fetchUserProfileDetailCacheEvents(pubKey) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            pubkey: decodedPubKey
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-profile-detail', msg);
        return fetchEventsResponse.events;
    }
    async fetchContactListCacheEvents(pubKey, detailIncluded = true) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            pubkey: decodedPubKey,
            detailIncluded: detailIncluded,
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-contact-list', msg);
        return fetchEventsResponse.events;
    }
    async fetchUserRelays(pubKey) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            pubkey: decodedPubKey
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-relays', msg);
        return fetchEventsResponse.events;
    }
    async fetchFollowersCacheEvents(pubKey) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            pubkey: decodedPubKey
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-followers', msg);
        return fetchEventsResponse.events;
    }
    async fetchCommunities(pubkeyToCommunityIdsMap) {
        let events;
        if (pubkeyToCommunityIdsMap && Object.keys(pubkeyToCommunityIdsMap).length > 0) {
            let msg = this.augmentWithAuthInfo({
                identifiers: []
            });
            for (let pubkey in pubkeyToCommunityIdsMap) {
                const decodedPubKey = pubkey.startsWith('npub1') ? index_1.Nip19.decode(pubkey).data : pubkey;
                const communityIds = pubkeyToCommunityIdsMap[pubkey];
                let request = {
                    pubkey: decodedPubKey,
                    names: communityIds
                };
                msg.identifiers.push(request);
            }
            let response = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-communities', msg);
            events = response.events;
        }
        else {
            let msg = this.augmentWithAuthInfo({
                limit: 50
            });
            let response = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-communities', msg);
            events = response.events;
        }
        return events;
    }
    async fetchAllUserRelatedCommunities(pubKey) {
        let msg = this.augmentWithAuthInfo({
            pubKey
        });
        let response = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-communities', msg);
        return response.events;
    }
    async fetchUserBookmarkedCommunities(pubKey, excludedCommunity) {
        let msg = this.augmentWithAuthInfo({
            pubKey
        });
        let response = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-bookmarked-communities', msg);
        let communities = [];
        for (let community of response.data) {
            if (excludedCommunity) {
                const decodedPubkey = index_1.Nip19.decode(excludedCommunity.creatorId).data;
                if (community.communityId === excludedCommunity.communityId && community.creatorId === decodedPubkey)
                    continue;
            }
            communities.push(community);
        }
        return communities;
    }
    async fetchCommunity(creatorId, communityId) {
        const decodedCreatorId = creatorId.startsWith('npub1') ? index_1.Nip19.decode(creatorId).data : creatorId;
        let msg = this.augmentWithAuthInfo({
            identifiers: [
                {
                    pubkey: decodedCreatorId,
                    names: [communityId]
                }
            ]
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-communities', msg);
        return fetchEventsResponse.events;
    }
    async fetchCommunityFeed(creatorId, communityId) {
        const decodedCreatorId = creatorId.startsWith('npub1') ? index_1.Nip19.decode(creatorId).data : creatorId;
        let msg = this.augmentWithAuthInfo({
            identifiers: [
                {
                    pubkey: decodedCreatorId,
                    names: [communityId]
                }
            ],
            limit: 50
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-community-feed', msg);
        return fetchEventsResponse.events;
    }
    async fetchCommunitiesFeed(communityUriArr) {
        let request = {
            kinds: [1],
            "#a": communityUriArr,
            limit: 50
        };
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEvents(request);
        return fetchEventsResponse.events;
    }
    async fetchCommunitiesGeneralMembers(communities) {
        let msg = this.augmentWithAuthInfo({
            identifiers: []
        });
        for (let community of communities) {
            const decodedCreatorId = community.creatorId.startsWith('npub1') ? index_1.Nip19.decode(community.creatorId).data : community.creatorId;
            let request = {
                pubkey: decodedCreatorId,
                names: [community.communityId]
            };
            msg.identifiers.push(request);
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-communities-general-members', msg);
        return fetchEventsResponse.events;
    }
    async fetchNotes(options) {
        const decodedNpubs = options.authors?.map(npub => index_1.Nip19.decode(npub).data);
        let decodedIds = options.ids?.map(id => id.startsWith('note1') ? index_1.Nip19.decode(id).data : id);
        let msg = {
            kinds: [1],
            limit: 20
        };
        if (decodedNpubs)
            msg.authors = decodedNpubs;
        if (decodedIds)
            msg.ids = decodedIds;
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEvents(msg);
        return fetchEventsResponse.events;
    }
    async fetchAllUserRelatedChannels(pubKey) {
        let msg = this.augmentWithAuthInfo({
            pubKey
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-related-channels', msg);
        let channels = [];
        const channelMetadataMap = {};
        for (let event of fetchEventsResponse.events) {
            if (event.kind === 40) {
                const channelInfo = utilsManager_1.SocialUtilsManager.extractChannelInfo(event);
                if (channelInfo) {
                    channels.push(channelInfo);
                }
            }
            else if (event.kind === 41) {
                const channelInfo = utilsManager_1.SocialUtilsManager.extractChannelInfo(event);
                if (channelInfo) {
                    channelMetadataMap[channelInfo.id] = channelInfo;
                }
            }
        }
        const pubkeyToCommunityIdsMap = {};
        for (let channel of channels) {
            const scpData = channel.scpData;
            if (!scpData?.communityUri)
                continue;
            const { communityId } = utilsManager_1.SocialUtilsManager.getCommunityBasicInfoFromUri(scpData.communityUri);
            pubkeyToCommunityIdsMap[channel.eventData.pubkey] = pubkeyToCommunityIdsMap[channel.eventData.pubkey] || [];
            if (!pubkeyToCommunityIdsMap[channel.eventData.pubkey].includes(communityId)) {
                pubkeyToCommunityIdsMap[channel.eventData.pubkey].push(communityId);
            }
        }
        let channelIdToCommunityMap = {};
        const communityEvents = await this.fetchCommunities(pubkeyToCommunityIdsMap);
        for (let event of communityEvents) {
            const communityInfo = utilsManager_1.SocialUtilsManager.extractCommunityInfo(event);
            const channelId = communityInfo.scpData?.channelEventId;
            if (!channelId)
                continue;
            channelIdToCommunityMap[channelId] = communityInfo;
        }
        return {
            channels,
            channelMetadataMap,
            channelIdToCommunityMap
        };
    }
    async fetchUserBookmarkedChannelEventIds(pubKey) {
        let msg = this.augmentWithAuthInfo({
            pubKey
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-bookmarked-channel-event-ids', msg);
        return fetchEventsResponse.data;
    }
    async fetchEventsByIds(ids) {
        let msg = this.augmentWithAuthInfo({
            ids
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-events', msg);
        return fetchEventsResponse.events;
    }
    async fetchChannelMessages(channelId, since = 0, until = 0) {
        const decodedChannelId = channelId.startsWith('npub1') ? index_1.Nip19.decode(channelId).data : channelId;
        let msg = this.augmentWithAuthInfo({
            channelId: decodedChannelId,
            limit: 20
        });
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-channel-messages', msg);
        return fetchEventsResponse.events;
    }
    async fetchChannelInfoMessages(channelId) {
        const decodedChannelId = channelId.startsWith('npub1') ? index_1.Nip19.decode(channelId).data : channelId;
        let msg = this.augmentWithAuthInfo({
            channelId: decodedChannelId,
            limit: 20
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-channel-info-messages', msg);
        return fetchEventsResponse.events;
    }
    async fetchMessageContactsCacheEvents(pubKey) {
        const senderToLastReadMap = {};
        if (localStorage) {
            const lastReadsStr = localStorage.getItem('lastReads');
            if (lastReadsStr) {
                const lastReads = JSON.parse(lastReadsStr);
                for (let sender in lastReads) {
                    const decodedSender = sender.startsWith('npub1') ? index_1.Nip19.decode(sender).data : sender;
                    senderToLastReadMap[decodedSender] = lastReads[sender];
                }
            }
        }
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        const msg = this.augmentWithAuthInfo({
            receiver: decodedPubKey,
            senderToLastReadMap: senderToLastReadMap
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-direct-messages-stats', msg);
        return fetchEventsResponse.events;
    }
    async fetchDirectMessages(pubKey, sender, since = 0, until = 0) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        const decodedSenderPubKey = sender.startsWith('npub1') ? index_1.Nip19.decode(sender).data : sender;
        const msg = this.augmentWithAuthInfo({
            receiver: decodedPubKey,
            sender: decodedSenderPubKey,
            limit: 20
        });
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-direct-messages', msg);
        return fetchEventsResponse.events;
    }
    async resetMessageCount(pubKey, sender) {
        if (localStorage) {
            const lastReadsStr = localStorage.getItem('lastReads');
            let lastReads = {};
            if (lastReadsStr) {
                lastReads = JSON.parse(lastReadsStr);
            }
            lastReads[sender] = Math.ceil(Date.now() / 1000);
            localStorage.setItem('lastReads', JSON.stringify(lastReads));
        }
    }
    async fetchGroupKeys(identifier) {
        let msg = this.augmentWithAuthInfo({
            identifier
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-application-specific', msg);
        return fetchEventsResponse.events?.length > 0 ? fetchEventsResponse.events[0] : null;
    }
    async fetchUserGroupInvitations(groupKinds, pubKey) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = this.augmentWithAuthInfo({
            pubKey: decodedPubKey,
            groupKinds: groupKinds
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-user-group-invitations', msg);
        let events = fetchEventsResponse.events?.filter(event => event.tags.filter(tag => tag[0] === 'p' && tag?.[3] === 'invitee').map(tag => tag[1]).includes(decodedPubKey));
        return events;
    }
    async fetchCalendarEvents(start, end, limit) {
        let msg = this.augmentWithAuthInfo({
            start: start,
            end: end,
            limit: limit || 10
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-calendar-events', msg);
        return fetchEventsResponse.events;
    }
    async fetchCalendarEvent(address) {
        const key = `${address.kind}:${address.pubkey}:${address.identifier}`;
        let msg = this.augmentWithAuthInfo({
            key
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-calendar-events', msg);
        return fetchEventsResponse.events?.length > 0 ? fetchEventsResponse.events[0] : null;
    }
    async fetchCalendarEventPosts(calendarEventUri) {
        let msg = this.augmentWithAuthInfo({
            eventUri: calendarEventUri,
            limit: 50
        });
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-calendar-posts', msg);
        return fetchEventsResponse.events;
    }
    async fetchCalendarEventRSVPs(calendarEventUri, pubkey) {
        let msg = this.augmentWithAuthInfo({
            eventUri: calendarEventUri
        });
        if (pubkey) {
            const decodedPubKey = pubkey.startsWith('npub1') ? index_1.Nip19.decode(pubkey).data : pubkey;
            msg.pubkey = decodedPubKey;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-calendar-rsvps', msg);
        return fetchEventsResponse.events;
    }
    async fetchLongFormContentEvents(pubKey, since = 0, until = 0) {
        let msg = this.augmentWithAuthInfo({
            limit: 20
        });
        if (pubKey) {
            const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
            msg.pubKey = decodedPubKey;
        }
        if (until === 0) {
            msg.since = since;
        }
        else {
            msg.until = until;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEventsFromAPI('fetch-long-form-content', msg);
        return fetchEventsResponse.events;
    }
    async searchUsers(query) {
        const req = {
            query: query,
            limit: 10
        };
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchCachedEvents('user_search', req);
        return fetchEventsResponse.events;
    }
    async fetchPaymentRequestEvent(paymentRequest) {
        let hash = index_1.Event.getPaymentRequestHash(paymentRequest);
        let req = {
            kinds: [9739],
            "#r": [hash]
        };
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEvents(req);
        return fetchEventsResponse.events?.length > 0 ? fetchEventsResponse.events[0] : null;
    }
    async fetchPaymentReceiptEvent(requestEventId) {
        let req = {
            kinds: [9740],
            "#e": [requestEventId]
        };
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchEvents(req);
        return fetchEventsResponse.events?.length > 0 ? fetchEventsResponse.events[0] : null;
    }
    getPaymentHash(tags) {
        let tagsMap = {};
        for (let _t of tags) {
            tagsMap[_t[0]] = _t.slice(1);
        }
        return tagsMap['bolt11']?.[0] || tagsMap['payreq']?.[0] || tagsMap['r']?.[0];
    }
    async fetchPaymentActivitiesForRecipient(pubkey, since = 0, until = 0) {
        let paymentRequestEventsReq = {
            kinds: [9739],
            authors: [pubkey],
            limit: 10
        };
        if (until === 0) {
            paymentRequestEventsReq.since = since;
        }
        else {
            paymentRequestEventsReq.until = until;
        }
        const paymentRequestEvents = await this._nostrCommunicationManager.fetchEvents(paymentRequestEventsReq);
        const requestEventIds = paymentRequestEvents.events.map(event => event.id);
        let paymentReceiptEventsReq = {
            kinds: [9740],
            "#e": requestEventIds
        };
        const paymentReceiptEvents = await this._nostrCommunicationManager.fetchEvents(paymentReceiptEventsReq);
        let paymentActivity = [];
        for (let requestEvent of paymentRequestEvents.events) {
            const paymentHash = this.getPaymentHash(requestEvent.tags);
            const amount = requestEvent.tags.find(tag => tag[0] === 'amount')?.[1];
            const receiptEvent = paymentReceiptEvents.events.find(event => event.tags.find(tag => tag[0] === 'e')?.[1] === requestEvent.id);
            let status = 'pending';
            let sender;
            if (receiptEvent) {
                status = 'completed';
                sender = receiptEvent.pubkey;
            }
            paymentActivity.push({
                paymentHash,
                sender,
                recipient: pubkey,
                amount,
                status,
                createdAt: requestEvent.created_at
            });
        }
        return paymentActivity;
    }
    async fetchPaymentActivitiesForSender(pubkey, since = 0, until = 0) {
        let paymentReceiptEventsReq = {
            kinds: [9740],
            authors: [pubkey],
            limit: 10
        };
        if (until === 0) {
            paymentReceiptEventsReq.since = since;
        }
        else {
            paymentReceiptEventsReq.until = until;
        }
        const paymentReceiptEvents = await this._nostrCommunicationManager.fetchEvents(paymentReceiptEventsReq);
        let requestEventIds = [];
        for (let event of paymentReceiptEvents.events) {
            const requestEventId = event.tags.find(tag => tag[0] === 'e')?.[1];
            if (requestEventId) {
                requestEventIds.push(requestEventId);
            }
        }
        let paymentRequestEventsReq = {
            kinds: [9739],
            ids: requestEventIds
        };
        const paymentRequestEvents = await this._nostrCommunicationManager.fetchEvents(paymentRequestEventsReq);
        let paymentActivity = [];
        for (let receiptEvent of paymentReceiptEvents.events) {
            const requestEventId = receiptEvent.tags.find(tag => tag[0] === 'e')?.[1];
            const requestEvent = paymentRequestEvents.events.find(event => event.id === requestEventId);
            if (requestEvent) {
                const paymentHash = this.getPaymentHash(requestEvent.tags);
                const amount = requestEvent.tags.find(tag => tag[0] === 'amount')?.[1];
                paymentActivity.push({
                    paymentHash,
                    sender: pubkey,
                    recipient: requestEvent.pubkey,
                    amount,
                    status: 'completed',
                    createdAt: receiptEvent.created_at
                });
            }
        }
        return paymentActivity;
    }
    async fetchUserFollowingFeed(pubKey, until = 0) {
        const decodedPubKey = pubKey.startsWith('npub1') ? index_1.Nip19.decode(pubKey).data : pubKey;
        let msg = {
            user_pubkey: decodedPubKey,
            timeframe: 'latest',
            scope: 'follows',
            limit: 20
        };
        if (until > 0) {
            msg.until = until;
        }
        const fetchEventsResponse = await this._nostrCommunicationManager.fetchCachedEvents('explore', msg);
        return fetchEventsResponse.events;
    }
}
exports.NostrEventManagerReadV1o5 = NostrEventManagerReadV1o5;
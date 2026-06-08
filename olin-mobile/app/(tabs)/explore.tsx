import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DailyEntry } from '@/components/daily-entry';
import { Timeline } from '@/components/timeline';
import { Navigation } from '@/components/navigation';

const savedSentences = [
  {
    id: 1,
    sentence: 'Today I finally felt productive again.',
    date: 'May 20, 2026',
  },
  {
    id: 2,
    sentence: 'Went on a quiet evening walk and cleared my mind.',
    date: 'May 19, 2026',
  },
  {
    id: 3,
    sentence: 'One sentence a day is slowly becoming my favorite habit.',
    date: 'May 18, 2026',
  },
  {
    id: 4,
    sentence: 'Spent time learning and building the Olin app.',
    date: 'May 17, 2026',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>

        <Text style={styles.title}>Saved Sentences</Text>
        <Text style={styles.subtitle}>
          A timeline of your thoughts, memories, and daily reflections.
        </Text>
      </View>

      <View style={styles.timeline}>
        {savedSentences.map((item, index) => (
          <View key={item.id} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.dot} />
              {index !== savedSentences.length - 1 && (
                <View style={styles.line} />
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.sentence}>{item.sentence}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF7',
  },
  content: {
    padding: 22,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 34,
    marginTop: 10,
  },
  smallTitle: {
    color: '#64748B',
    fontSize: 15,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  timeline: {
    gap: 18,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineLeft: {
    width: 34,
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#7C9A92',
    marginTop: 8,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#D7E0DB',
    marginTop: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  date: {
    fontSize: 13,
    color: '#7C8A96',
    marginBottom: 10,
    fontWeight: '600',
  },
  sentence: {
    fontSize: 18,
    lineHeight: 28,
    color: '#0F172A',
    fontWeight: '700',
  },
});
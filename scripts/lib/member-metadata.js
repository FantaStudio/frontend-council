/**
 * Обогащает results members метаданными из job.json.
 *
 * @param members — массив results
 * @param jobMembers — members из job.json
 * @returns members с level, project, tier, model
 */
function enrichMembersWithMetadata(members, jobMembers) {
  const metaByName = new Map(
    (jobMembers || []).map((m) => [String(m.name), m]),
  );
  return (members || []).map((member) => {
    const meta = metaByName.get(String(member.member)) || {};
    return {
      ...member,
      level: meta.level != null ? String(meta.level) : null,
      project: meta.project != null ? String(meta.project) : null,
      tier: meta.tier != null ? String(meta.tier) : null,
      model: meta.model != null ? String(meta.model) : null,
    };
  });
}

module.exports = { enrichMembersWithMetadata };

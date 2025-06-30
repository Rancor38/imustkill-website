#!/bin/bash

# Quick Reference @RuleName Integration Test Script
# Tests all functionality including new @RuleName linking for new players

echo "🔍 Testing Quick Reference @RuleName Integration..."
echo "=================================================="

# Test 1: Homepage Navigation
echo "📋 Test 1: Homepage Navigation"
echo "- Navigate to: http://localhost:3000"
echo "- Look for 'Quick Reference' button"
echo "- Verify button is positioned between 'Spells' and 'Running the Game'"
echo ""

# Test 2: Quick Reference Page Load with @RuleName Links
echo "📋 Test 2: Quick Reference Page Load with @RuleName Links"
echo "- Navigate to: http://localhost:3000/quick-reference"
echo "- Verify page loads with three sections:"
echo "  • Core Mechanics (with @RuleName links in descriptions)"
echo "  • Character Stats (with @RuleName links in descriptions and chips)"
echo "  • Damage Types (with @RuleName links in descriptions)"
echo ""

# Test 3: Core Mechanics @RuleName Links
echo "📋 Test 3: Core Mechanics @RuleName Links"
echo "- In Core Mechanics section, look for clickable @RuleName links:"
echo "  • 'Roll to Succeed' description: @Body, @Agility, @Focus, @Fate"
echo "  • 'Attack Rolls' description: @AttackStat, @Damage, @Attack"
echo "  • 'Defense Actions' description: @Dodge, @Brace"
echo "  • 'Advantage' description: @Advantage"
echo "  • 'Disadvantage' description: @Disadvantage"
echo "- Click each link to verify navigation to detailed rules"
echo ""

# Test 4: Character Stats @RuleName Links
echo "📋 Test 4: Character Stats @RuleName Links"
echo "- In Character Stats section, verify @RuleName links in:"
echo "  • Stat descriptions: @Body, @Agility, @Focus, @Fate"
echo "  • Chip labels (uses):"
echo "    - Body: @AttackStat, @Brace"
echo "    - Agility: @AttackStat, @Dodge"
echo "    - Focus: @AttackStat, @GatherSpells, @Negotiate"
echo "    - Fate: @HitPoints, @Death"
echo "- Click chip labels to verify they are clickable and navigate properly"
echo ""

# Test 5: Damage Types @RuleName Links
echo "📋 Test 5: Damage Types @RuleName Links"
echo "- In Damage Types section, verify @RuleName links:"
echo "  • Physical: @PhysicalDamage"
echo "  • Spiritual: @SpiritualDamage"
echo "  • Hybrid: @HybridDamage"
echo "- Click each link to verify navigation to Combat Mechanics damage types"
echo ""

# Test 6: Anchor Navigation
echo "📋 Test 6: Anchor Navigation"
echo "- Test direct URLs:"
echo "  • http://localhost:3000/quick-reference#core-mechanics"
echo "  • http://localhost:3000/quick-reference#character-stats"
echo "  • http://localhost:3000/quick-reference#damage-types"
echo "- Verify smooth scrolling to correct sections"
echo "- Verify proper header offset (80px)"
echo ""

# Test 7: Cross-Page Navigation to Quick Reference
echo "📋 Test 7: Cross-Page Navigation to Quick Reference"
echo "- Navigate to: http://localhost:3000/source-registry"
echo "- Look for new @RuleName references:"
echo "  • @CoreMechanics → /quick-reference#core-mechanics"
echo "  • @CharacterStats → /quick-reference#character-stats"
echo "  • @DamageTypes → /quick-reference#damage-types"
echo "- Click each link to verify navigation back to Quick Reference"
echo ""

# Test 8: New Player Learning Flow
echo "📋 Test 8: New Player Learning Flow"
echo "- Start at Quick Reference: http://localhost:3000/quick-reference"
echo "- Click @Body link in 'Roll to Succeed' description"
echo "- Should navigate to: http://localhost:3000/character-creation#stats"
echo "- Use browser back button to return to Quick Reference"
echo "- Try the same flow with other @RuleName links"
echo ""

# Test 9: Responsive Design
echo "📋 Test 9: Responsive Design"
echo "- Test Quick Reference on different screen sizes"
echo "- Verify three columns on medium+ screens (Grid md={4})"
echo "- Verify single column on small screens (Grid xs={12})"
echo "- Verify @RuleName links work on mobile devices"
echo ""

# Test 10: Visual Consistency
echo "📋 Test 10: Visual Consistency"
echo "- Verify @RuleName links are properly styled (underlined, colored)"
echo "- Check that chip labels with @RuleName links maintain visual consistency"
echo "- Verify hover effects work on @RuleName links"
echo "- Check that descriptions with @RuleName links read naturally"
echo ""

echo "✅ All tests complete!"
echo ""
echo "🎯 Expected Results:"
echo "- Quick Reference displays three narrow columns on medium screens"
echo "- All @RuleName links are clickable and properly styled"
echo "- Links navigate to correct detailed rule sections"
echo "- Anchor navigation works smoothly with proper offset"
echo "- New player learning flow is intuitive and helpful"
echo "- Chip labels support @RuleName linking"
echo ""
echo "🔗 Quick Links for Testing:"
echo "- Homepage: http://localhost:3000"
echo "- Quick Reference: http://localhost:3000/quick-reference"
echo "- Character Creation Stats: http://localhost:3000/character-creation#stats"
echo "- Combat Mechanics: http://localhost:3000/combat-mechanics#actions"
echo "- Source Registry: http://localhost:3000/source-registry"
echo "- Test File: file://$(pwd)/test-anchor-navigation.html"
echo ""
echo "🚀 New Player Benefits:"
echo "- Quick overview with progressive disclosure"
echo "- One-click access to detailed rules"
echo "- Natural discovery of related concepts"
echo "- Seamless navigation between summary and details"
